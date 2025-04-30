const FOACard = () => {
  return (
    <div className="w-80 flex flex-col rounded-md shadow-surface bg-white shrink-0 snap-center">
      {/* 상단: 날짜 & D-day */}
      <div className="p-5">
        <div className="flex gap-2">
          <div className="b4 text-gray-11 bg-gray-3 px-2 py-1 w-fit rounded-md">
            5월 2일까지
          </div>
          <div className="text-error bg-errorContainer caption1 px-2 py-1 w-fit rounded-md">
            D-3
          </div>
        </div>
      </div>

      {/* 본문: 텍스트 내용 */}
      <div className="px-5 flex flex-col gap-2 mb-4">
        <p className="h3 leading-snug line-clamp-2">
          [서울] 2025년 AI 기업 고성능 컴퓨팅 인프라 지원 사업 모집...
        </p>
        <p className="b5 text-gray-6">대중소기업농어업협력재단</p>
      </div>

      {/* 하단: 버튼 */}
      <div className="bg-secondary w-full h-10 flex items-center justify-center rounded-b-xl">
        <p className="text-white text-sm font-semibold">자세히</p>
        <img src="svgs/support/company/arrowIcon.svg" className="w-5 h-5" />
      </div>
    </div>
  );
};

export default FOACard;
