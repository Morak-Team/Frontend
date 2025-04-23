import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { postRecipt } from "@/apis/review/postRecipt";
import { useNavigate } from "react-router-dom";

const ReviewImageCapture = ({
  storeId,
  turnOnCamera,
  onCloseCamera,
  onCaptureSuccess,
}) => {
  const navigate = useNavigate();

  useEffect(() => () => stopCamera(), []);

  const streamRef = useRef(null);

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const [videoVisible, setVideoVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [fromGallery, setFromGallery] = useState(false);

  const startCamera = async () => {
    stopCamera();
    try {
      setVideoVisible(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.log("카메라 접근 실패", error);
      alert("카메라 접근에 실패했습니다. 카메라 접근 권한을 확인해 주세요!");
    }
  };

  useEffect(() => {
    if (turnOnCamera) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [turnOnCamera]);

  const stopCamera = () => {
    const video = videoRef.current;
    if (video && video.srcObject) {
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      video.srcObject = null;
    }

    // 스트림이 살아 있으면 확실히 종료
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    // video 엘리먼트가 남아 있다면 연결 해제
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setVideoVisible(false);
  };

  const handleCloseCamera = () => {
    stopCamera(); // 스트림 종료
    setVideoVisible(false);
    setCapturedImage(null);
    setImageBlob(null);
    if (onCloseCamera) onCloseCamera();
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

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: postRecipt,
    retry: 2,
  });

  const handleUsePhoto = async () => {
    if (!imageBlob) return;

    stopCamera();

    mutate(imageBlob, {
      onSuccess: (data) => {
        console.log("인증 성공!", data);
        onCaptureSuccess?.(); // ✅ 성공 시 호출
        handleCloseCamera(); // ✅ 카메라 종료
      },
      onError: (error) => {
        console.error("인증 실패", error);
        alert("이미지 업로드에 실패했습니다. 다시 시도해 주세요.");

        // ✅ 실패 시 다시 촬영 흐름
        setCapturedImage(null);
        setImageBlob(null);
        setFromGallery(false);
        setVideoVisible(true); // 카메라 다시 활성화
        startCamera(); // 새 스트림 요청
      },
    });
  };

  return (
    <>
      <div>
        <div>
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
                onClick={handleCloseCamera}
                className="absolute top-10 right-4 z-[10000]"
              >
                <img
                  src="/public/images/review/xButtonIcon.png"
                  alt="닫기"
                  className="w-8 h-8"
                />
              </button>

              {/* 갤러리 버튼 (왼쪽 하단) */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-4 left-4 z-[10000] bg-white/80 backdrop-blur-sm p-3 rounded-full shadow"
              >
                <img
                  src="/public/images/review/galleryIcon.png"
                  alt="갤러리"
                  className="w-6 h-6"
                />
              </button>

              {/* 사진 찍기 버튼 (오른쪽 하단) */}
              <button
                onClick={handleCapture}
                className="absolute bottom-4 right-4 z-[10000] bg-white/80 backdrop-blur-sm p-3 rounded-full shadow"
              >
                <img
                  src="/public/images/review/cameraIcon.png"
                  alt="카메라"
                  className="w-6 h-6"
                />
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

              {/* ✅ isPending일 때 띄우는 오버레이 */}
              {isPending && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-[10000]">
                  <p className="text-white text-xl font-bold animate-pulse">
                    📷 사진 검증 중입니다...
                  </p>
                </div>
              )}

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
