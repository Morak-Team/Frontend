import FOACard from "@/pages/support/components/FOACard";
import useDragScroll from "@/hooks/useDragScroll";
import useIsTouchDevice from "@/hooks/useIsTouchDevice";

const CompanyTab = () => {
  const isTouch = useIsTouchDevice();
  const rawScrollRef = useDragScroll();
  const scrollRef = isTouch ? undefined : rawScrollRef;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <p className="h3">진행중인 지원 사업</p>
        <div className="flex items-center gap-1 cursor-pointer">
          <p className="b5 text-gray-9">전체 보기</p>
          <img
            src="/svgs/support/company/fullOfViewIcon.svg"
            className="w-5 h-5"
            alt="전체 보기"
          />
        </div>
      </div>

      <div
        ref={scrollRef}
        className={`flex overflow-x-auto gap-4 px-4 scrollbar-hide select-none cursor-grab ${
          isTouch ? "scroll-snap-x" : ""
        }`}
      >
        {[...Array(7)].map((_, idx) => (
          <div key={idx} className="shrink-0 w-80 scroll-snap-align-center">
            <FOACard />
          </div>
        ))}
      </div>

      <div className="mt-10">
        <p className="h3">내게 맞는 금융 상품</p>
      </div>
      <div className="flex justify-center items-center">
        <div className="mt-5 bg-secondary rounded-md sm:w-full w-80 h-40"></div>
      </div>
    </div>
  );
};

export default CompanyTab;
