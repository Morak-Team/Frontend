import { useNavigate } from "react-router-dom";

const FOAItem = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col rounded-md shadow-surface bg-white shrink-0 snap-center w-full">
      {/* 상단: 날짜 & D-day */}
      <div className="p-5 flex justify-between">
        <div className="flex gap-2">
          <div className="b4 text-gray-11 bg-gray-3 px-2 py-1 w-fit rounded-md">
            5월 2일까지
          </div>
          <div className="text-error bg-errorContainer caption1 px-2 py-1 w-fit rounded-md">
            D-3
          </div>
        </div>
        <img
          onClick={() => navigate("/support/list/3")}
          src="/svgs/support/company/forwardIcon.svg"
          className="w-4 h-4 cursor-pointer"
        />
      </div>

      {/* 본문: 텍스트 내용 */}
      <div className="px-5 flex flex-col gap-2 mb-4 mt-4">
        <p className="h3 leading-snug line-clamp-2">
          [서울] 2025년 AI 기업 고성능 컴퓨팅 인프라 지원 사업 모집...
        </p>
        <p className="b5 text-gray-6">대중소기업농어업협력재단</p>
      </div>
    </div>
  );
};

export default FOAItem;
