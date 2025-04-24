const SelectTag = ({ onNext }) => {
  return (
    <div className="relative w-full min-h-screen bg-white flex justify-center">
      {/* 콘텐츠 스크롤 영역 */}
      <div className="w-full max-w-[760px] px-5 pt-14 sm:pt-32 pb-44 overflow-y-auto">
        {/* 닫기 버튼 */}
        <div className="flex justify-end">
          <img src="/svgs/review/xIcon.svg" className="w-8 h-8" />
        </div>

        {/* 텍스트 */}
        <div className="mt-6 mb-10 text-center">
          <p className="text-xl font-bold">
            <span className="h2 text-orange-500">이 장소</span>
            <span className="h2 text-gray-12">는 어떠셨나요?</span>
          </p>
        </div>

        {/* 콘텐츠 */}
        <div className="flex flex-col items-center gap-3 w-full max-w-[760px]">
          <div className="w-80 h-96 bg-gray-100 sm:w-[77%]" />
          <div className="w-80 h-96 bg-gray-100 sm:w-[77%]" />
        </div>
      </div>

      {/* 고정 하단 버튼 */}
      <div className="fixed bottom-0 w-full max-w-[760px] flex justify-center bg-white py-4 shadow-md z-50">
        <button
          onClick={onNext}
          className="w-80 sm:w-[77%] h-12 rounded-md px-6 py-3 text-white bg-orange-500 b1 border border-black"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default SelectTag;
