import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import PlaceContent from "./PlaceContent";
import ReviewImageCapture from "@pages/map/components/ReviewImageCapture";
import ConfirmImage from "@pages/map/components/ConfirmImage";
import ReviewList from "@pages/map/components/ReviewList";

const PlaceBottomSheet = ({ place, onClose, recapture }) => {
  const [liked, setLiked] = useState(place.liked || false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [turnOnCamera, setTurnOnCamera] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // 가게 구별용 id
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
      className="fixed bottom-[84px] left-1/2 -translate-x-1/2 w-full max-w-[760px] z-50 bg-white rounded-t-[12px] shadow-[0px_-2px_12px_0px_rgba(46,45,43,0.05)] overflow-hidden"
      animate={controls}
      initial={{ height: MIN_HEIGHT }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClickExpand}
    >
      <div className="relative w-full flex justify-center items-center py-3 cursor-pointer">
        <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
      </div>

      <div
        className={`px-4 sm:px-6 pb-6 mt-2${
          isExpanded
            ? "h-full overflow-y-auto pt-10 sm:pt-12"
            : "overflow-hidden h-[220px]"
        }`}
      >
        {isExpanded && (
          <div className="flex justify-end mb-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-4 mt-6 -mr-4"
            >
              <img
                src="/svgs/Ic_X.svg"
                alt="닫기 버튼"
                className="w-8 h-8 cursor-pointer"
              />
            </button>
          </div>
        )}

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
