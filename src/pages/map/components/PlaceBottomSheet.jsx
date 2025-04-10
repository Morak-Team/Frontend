import { useState, useRef, useEffect } from "react";
import { motion, animate } from "framer-motion";
import PlaceContent from "./PlaceContent";
import { Link } from "react-router-dom";

const PlaceBottomSheet = ({ place, onClose }) => {
  const [liked, setLiked] = useState(place.liked || false);
  const [height, setHeight] = useState(120);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 가게 구별용 id
  const storeId = 1;

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
        {isExpanded && (
          <div>
            <div className="mt-10 flex justify-between">
              <h3 className="font-semibold text-xl mb-2">리뷰</h3>
              <button className="text-sm text-orange-500">✏️ 리뷰 쓰기</button>
            </div>
            <Link to={`/review/${storeId}`}>리뷰 전체보기</Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PlaceBottomSheet;
