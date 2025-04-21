import { useState, useRef, useEffect } from "react";
import { motion, animate } from "framer-motion";
import PlaceContent from "./PlaceContent";
import { Link } from "react-router-dom";
import ReviewContent from "@/pages/map/components/ReviewContent";

const PlaceBottomSheet = ({ place, onClose }) => {
  const [liked, setLiked] = useState(place.liked || false);
  const [height, setHeight] = useState(120);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 가게 구별용 id
  const storeId = 1;

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

  const MIN_HEIGHT = 120;
  const MAX_HEIGHT = useRef(window.innerHeight);

  const sheetRef = useRef(null);
  const startY = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      MAX_HEIGHT.current = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isExpanded ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isExpanded]);

  const handleTouchStart = (e) => {
    if (!isMobile) return;
    startY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (!isMobile) return;
    const endY = e.changedTouches[0].clientY;
    const delta = endY - startY.current;

    if (delta < -50) {
      animateHeight(MAX_HEIGHT.current);
      setIsExpanded(true);
    } else if (delta > 50) {
      animateHeight(MIN_HEIGHT);
      setIsExpanded(false);
    }
  };

  const handleClickExpand = () => {
    if (!isMobile && !isExpanded) {
      animateHeight(MAX_HEIGHT.current);
      setIsExpanded(true);
    }
  };

  const animateHeight = (toHeight) => {
    animate(height, toHeight, {
      duration: 0.3,
      onUpdate: (latest) => setHeight(latest),
    });
  };

  return (
    <motion.div
      ref={sheetRef}
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[760px] z-50 bg-white rounded-t-2xl shadow-xl"
      style={{ height }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClickExpand}
    >
      <div className="relative w-full flex justify-center items-center py-3 cursor-pointer">
        <div className="w-12 h-1.5 bg-gray-300 rounded-full" />

        {isExpanded && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute right-2 top-10 p-4"
          >
            <img
              src="/svgs/ic_X.svg"
              alt="닫기 버튼"
              className="w-8 h-8 cursor-pointer"
            />
          </button>
        )}
      </div>

      <div
        className={`px-5 pb-6 mt-2 ${
          isExpanded ? "h-full overflow-y-auto pt-24" : "overflow-hidden"
        }`}
      >
        <PlaceContent
          name={place.name}
          category={place.category}
          distance={place.distance}
          address={place.address}
          images={place.images}
          liked={liked}
          onToggleLike={() => setLiked((prev) => !prev)}
          isDetail={isExpanded}
          showMapLink={isExpanded}
        />
        {/* 이 부분 컴포넌트로 빼기 */}
        {isExpanded && <ReviewContent storeId={storeId} />}
      </div>
    </motion.div>
  );
};

export default PlaceBottomSheet;
