import FOACard from "@/pages/support/components/FOACard";
import useDragScroll from "@/hooks/useDragScroll";
import useIsTouchDevice from "@/hooks/useIsTouchDevice";
import { useNavigate } from "react-router-dom";
import { useGetAnnouncement } from "@/apis/announcement/queries";
import "@/styles/spinner.css";

const CompanyTab = () => {
  const navigate = useNavigate();
  const isTouch = useIsTouchDevice();
  const rawScrollRef = useDragScroll();
  const scrollRef = isTouch ? undefined : rawScrollRef;
  const { data = [], isLoading } = useGetAnnouncement(5);
  console.log(data);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <p className="h3">진행중인 지원 사업</p>
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => navigate("/support/list")}
        >
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
        {isLoading ? (
          <div className="w-full flex justify-center items-center h-32">
            <div className="loader" />
          </div>
        ) : (
          data?.map((item, idx) => (
            <div key={idx} className="shrink-0 w-80 scroll-snap-align-center">
              <FOACard data={item} />
            </div>
          ))
        )}
      </div>

      <div className="mt-10">
        <p className="h3">내게 맞는 금융 상품</p>
      </div>
      <div className="mt-5 bg-secondary rounded-md w-full h-40 pt-6 pl-6 pr-4 pb-4 flex flex-col justify-between">
        <div>
          <p className="text-white h3">기업 정보를 입력해 주세요</p>
          <p className="text-white b5 mt-1">맞춤 금융 상품을 추천해 드릴게요</p>
        </div>

        <div
          className="flex justify-end"
          onClick={() => navigate("/support/recommend")}
        >
          <button className="flex gap-1 items-center bg-white py-1 pl-2 pr-3 rounded-md">
            <img src="/svgs/support/company/checkListIcon.svg" />
            <p className="b4 text-secondary">입력하기</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyTab;
