import { useState, useRef } from "react";
import { Link } from "react-router-dom";

const ReviewContent = ({ storeId }) => {
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const [videoVisible, setVideoVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [fromGallery, setFromGallery] = useState(false);

  const startCamera = async () => {
    setVideoVisible(true);
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  const handleGallerySelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageBlob(file);
      setCapturedImage(imageUrl);
      setFromGallery(true);
      setVideoVisible(false); // ✅ 영상 끄기
    }

    // ✅ 입력값 초기화 (같은 파일 선택 가능하게)
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
        setFromGallery(false); // ✅ 카메라에서 촬영한 경우
        setVideoVisible(false);
      }
    }, "image/jpeg");
  };

  const handleUsePhoto = () => {
    // TODO: 이곳에 업로드 or 리뷰작성 등 후속 동작 추가 예정
    console.log("✅ 사용하기 버튼 클릭됨. 사진 데이터로 처리 시작!");
  };

  return (
    <>
      <div>
        <div className="mt-10 flex justify-between">
          <h3 className="font-semibold text-xl mb-2">리뷰</h3>
          <button className="text-sm text-orange-500" onClick={startCamera}>
            ✏️ 리뷰 쓰기
          </button>

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
                onClick={() => {
                  const stream = videoRef.current?.srcObject;
                  stream?.getTracks().forEach((track) => track.stop());
                  setVideoVisible(false);
                }}
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
        <Link to={`/review/${storeId}`}>리뷰 전체보기</Link>
      </div>
    </>
  );
};

export default ReviewContent;
