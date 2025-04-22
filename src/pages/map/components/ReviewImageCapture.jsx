import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPresignedUrl } from "@/apis/review/getPresignedUrl";
import { uploadImageToS3 } from "@/apis/review/uploadImageToS3";
import { useMutation } from "@tanstack/react-query";
import { postImageKey } from "@/apis/review/postImageKey";
import { useNavigate } from "react-router-dom";

const ReviewImageCapture = ({ storeId, turnOnCamera }) => {
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const [videoVisible, setVideoVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [fromGallery, setFromGallery] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      if (!turnOnCamera) {
        return;
      }
      try {
        setVideoVisible(true);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.log("카메라 접근 실패", error);
        alert("카메라 접근에 실패했습니다. 카메라 접근 권한을 확인해 주세요!");
      }
    };
    startCamera();
  }, [turnOnCamera]);

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setVideoVisible(false);
  };

  const handleGallerySelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 선택 가능합니다.");
        e.target.value = "";
        fileInputRef.current?.click();
        return;
      }
      // const MAX_SIZE = 5 * 1024 * 1024;
      // if (file.size < MAX_SIZE) {
      //   alert("파일 크기는 5MB 이하여야 합니다.");
      //   e.target.value = "";
      //   fileInputRef.current?.click();
      //   return;
      // }

      const imageUrl = URL.createObjectURL(file);
      setImageBlob(file);
      setCapturedImage(imageUrl);
      setFromGallery(true);
      setVideoVisible(false);
    }

    e.target.value = "";
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        const imageUrl = URL.createObjectURL(blob);
        setImageBlob(blob);
        setCapturedImage(imageUrl);
        setFromGallery(false);
        setVideoVisible(false);
      }
    }, "image/jpeg");
  };

  const {
    mutate: uploadToS3API,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: uploadImageToS3,
    onSuccess: () => {
      console.log("업로드 성공!");
    },
    onError: (error) => {
      console.log("업로드 실패");
    },
  });

  const handleUsePhoto = async () => {
    if (!imageBlob) return;

    let originalFileName = "unknown";
    let type = imageBlob.type;
    let kakaoId = "123";

    if (imageBlob.name) {
      originalFileName = imageBlob.name.split(".")[0]; // 파일 이름에서 확장자 제거
    } else {
      originalFileName = `photo_${Date.now()}`; // Blob일 경우 임의 생성
    }
    try {
      const { url, key } = await getPresignedUrl(
        originalFileName,
        type,
        kakaoId
      ); // 서버에서 URL과 key 받기
      const success = await uploadImageToS3(url, imageBlob);
      if (success) {
        console.log("S3 업로드 성공!", key);
        const result = await postImageKey(key);

        if (result.status == 200) {
          sessionStorage.setItem("reviewResult", JSON.stringify({ result }));
          navigate("/write-review");
        }
      }
    } catch (error) {
      console.error("이미지 처리 실패", error);
    }
  };

  return (
    <>
      <div>
        <div className="mt-10 flex justify-between">
          {/* <button className="text-sm text-orange-500" onClick={startCamera}>
            ✏️ 리뷰 쓰기
          </button> */}

          {/* 숨겨진 input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleGallerySelect}
          />
          {videoVisible && (
            <div className="fixed inset-0 z-[9999] bg-black">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />

              {/* 닫기 버튼 */}
              <button
                onClick={stopCamera}
                className="absolute top-4 right-4 z-[10000] text-white text-xl p-2 bg-black/50 rounded"
              >
                ✕
              </button>

              {/* 갤러리 버튼 (왼쪽 하단) */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-4 left-4 z-[10000] bg-white/80 backdrop-blur-sm p-3 rounded-full shadow"
              >
                <img
                  src="/icons/gallery.svg"
                  alt="갤러리"
                  className="w-6 h-6"
                />
              </button>

              {/* 사진 찍기 버튼 (오른쪽 하단) */}
              <button
                onClick={handleCapture}
                className="absolute bottom-4 right-4 z-[10000] bg-white/80 backdrop-blur-sm p-3 rounded-full shadow"
              >
                <img src="/icons/camera.svg" alt="카메라" className="w-6 h-6" />
              </button>

              <canvas ref={canvasRef} style={{ display: "none" }} />
            </div>
          )}
          {capturedImage && (
            <div className="fixed inset-0 z-[9999] bg-black">
              <img
                src={capturedImage}
                alt="촬영된 이미지"
                className="w-full h-full object-cover"
              />

              {/* 상단 우측 버튼: 다시 찍기 또는 다시 선택하기 */}
              {fromGallery ? (
                <>
                  {/* 다시 선택하기 (왼쪽) */}
                  <button
                    onClick={() => {
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                        fileInputRef.current.click();
                      }
                    }}
                    className="absolute top-4 left-4 z-[10000] text-white text-xl p-2 bg-black/50 rounded"
                  >
                    🔁 다시 선택하기
                  </button>

                  {/* 다시 찍기 (오른쪽) */}
                  <button
                    onClick={() => {
                      setCapturedImage(null);
                      setFromGallery(false); // 카메라로 전환 플래그
                      setVideoVisible(true);
                      startCamera();
                    }}
                    className="absolute top-4 right-4 z-[10000] text-white text-xl p-2 bg-black/50 rounded"
                  >
                    🔁 다시 찍기
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setCapturedImage(null);
                    setVideoVisible(true);
                    startCamera();
                  }}
                  className="absolute top-4 right-4 z-[10000] text-white text-xl p-2 bg-black/50 rounded"
                >
                  🔁 다시 찍기
                </button>
              )}

              {/* 사용하기 버튼 (공통) */}
              <button
                onClick={handleUsePhoto}
                className="absolute bottom-4 right-4 z-[10000] px-4 py-2 bg-orange-500 text-white rounded shadow font-semibold"
              >
                ✅ 사용하기
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReviewImageCapture;
