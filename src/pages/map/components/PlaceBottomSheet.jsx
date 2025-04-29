import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import PlaceContent from "./PlaceContent";
import ReviewImageCapture from "@pages/map/components/ReviewImageCapture";
import ConfirmImage from "@pages/map/components/ConfirmImage";
import ReviewList from "@pages/map/components/ReviewList";
import useUIStore from "@/store/uiStore";

const PlaceBottomSheet = ({ place, onClose, onToggleLike, onExpandChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { turnOnCamera, setTurnOnCamera, setBottomSheetOpen } = useUIStore();

  const bottomOffset =
    turnOnCamera || isExpanded ? "bottom-0" : "bottom-[84px]";

  const storeId = 1;
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
        className={`px-5 sm:px-6 pb-6 transition-all duration-300 h-full ${
          isExpanded ? "max-h-[100vh] overflow-y-auto pt-10" : ""
        }`}
      >
        {isExpanded && (
          <div className="flex justify-end mb-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-4 -mt-4 -mr-4"
            >
              <img src="/svgs/Ic_X.svg" alt="닫기 버튼" className="w-8 h-8" />
            </button>
          </div>
        )}

        <PlaceContent
          {...place}
          liked={place.liked}
          onToggleLike={() => onToggleLike(place.id)}
          isDetail={isExpanded}
          showMapLink={isExpanded}
        />

        {isExpanded && (
          <>
            <ReviewList setTurnOnCamera={setTurnOnCamera} storeId={storeId} />

            {turnOnCamera && (
              <ReviewImageCapture
                storeId={storeId}
                turnOnCamera={turnOnCamera}
                onCloseCamera={() => setTurnOnCamera(false)}
                onCaptureSuccess={() => {
                  setTurnOnCamera(false);
                  setShowConfirm(true);
                }}
              />
            )}

            {showConfirm && (
              <ConfirmImage
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
