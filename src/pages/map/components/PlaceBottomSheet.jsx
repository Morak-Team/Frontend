import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import PlaceContent from "./PlaceContent";
import ReviewImageCapture from "@pages/map/components/ReviewImageCapture";
import ConfirmImage from "@pages/map/components/ConfirmImage";
import ReviewList from "@pages/map/components/ReviewList";
import useUIStore from "@/store/uiStore";
import { usePaymentStore } from "@/store/paymentStore";

const PlaceBottomSheet = ({ place, onClose, onToggleLike, onExpandChange }) => {
  // console.log("place 정보", place);
  const setCompanyId = usePaymentStore((s) => s.setCompanyId);
  setCompanyId(place.companyId);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({});

  const { turnOnCamera, setTurnOnCamera, setBottomSheetOpen } = useUIStore();

  const bottomOffset =
    turnOnCamera || isExpanded ? "bottom-0" : "bottom-[84px]";

  const MIN_HEIGHT = 220;
  const MAX_HEIGHT = useRef(window.innerHeight);
  const controls = useAnimation();

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
    setBottomSheetOpen(isExpanded);
    onExpandChange?.(isExpanded);

    return () => {
      document.body.style.overflow = "auto";
      setBottomSheetOpen(false);
      onExpandChange?.(false);
    };
  }, [isExpanded, onExpandChange, setBottomSheetOpen]);

  const handleTouchStart = (e) => {
    if (!isMobile) return;
    startY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (!isMobile) return;
    const endY = e.changedTouches[0].clientY;
    const delta = endY - startY.current;

    if (delta < -50) {
      controls.start({ height: MAX_HEIGHT.current });
      setIsExpanded(true);
    } else if (delta > 50) {
      controls.start({ height: MIN_HEIGHT });
      setIsExpanded(false);
    }
  };

  const handleClickExpand = () => {
    if (!isMobile && !isExpanded) {
      controls.start({ height: MAX_HEIGHT.current });
      setIsExpanded(true);
    }
  };

  return (
    <motion.div
      ref={sheetRef}
      className={`fixed ${bottomOffset} left-1/2 -translate-x-1/2 w-full max-w-[760px] z-50 bg-white rounded-t-[12px] shadow ${
        turnOnCamera || showConfirm ? "" : "overflow-hidden"
      }`}
      animate={controls}
      initial={{ height: MIN_HEIGHT }}
      transition={{ duration: 0.35 }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClickExpand}
    >
      <div className="relative w-full flex justify-center items-center py-3 cursor-pointer">
        <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
      </div>

      <div
        className={`transition-all duration-300 h-full ${
          isExpanded ? "max-h-[100vh] overflow-y-auto" : ""
        }`}
      >
        {isExpanded && (
          <div className="relative w-full h-[120px]">
            <img
              src={"/svgs/map/Img_Map.svg"}
              alt="상단 배경"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute top-3 right-3 p-2 z-10"
              aria-label="닫기"
            >
              <img src="/svgs/Ic_X.svg" alt="닫기 버튼" className="w-6 h-6" />
            </button>
          </div>
        )}

        <PlaceContent
          place={place}
          liked={place.liked}
          onToggleLike={onToggleLike}
          showMapLink={isExpanded}
        />

        {isExpanded && (
          <>
            <ReviewList
              setTurnOnCamera={setTurnOnCamera}
              companyId={place.companyId}
            />

            {turnOnCamera && (
              <ReviewImageCapture
                companyId={place.companyId}
                turnOnCamera={turnOnCamera}
                onCloseCamera={() => setTurnOnCamera(false)}
                onCaptureSuccess={(data) => {
                  setTurnOnCamera(false);
                  setShowConfirm(true);
                  setCompanyInfo(data);
                }}
              />
            )}

            {showConfirm && (
              <ConfirmImage
                data={companyInfo}
                onReject={() => {
                  sessionStorage.removeItem("reviewResult");
                  setShowConfirm(false);
                  setTurnOnCamera(true);
                }}
              />
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default PlaceBottomSheet;
