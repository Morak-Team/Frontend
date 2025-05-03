const IntroModal = ({ onClose }) => {
  return (
    <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-[10001] w-[90%] max-w-[22rem] sm:max-w-[25rem] px-6 py-10 bg-white rounded-2xl shadow-lg flex flex-col gap-6">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
        aria-label="닫기"
      >
        <img
          src="/svgs/Ic_X.svg"
          alt="닫기"
          className="w-6 h-6 sm:w-7 sm:h-7"
        />
      </button>

      <p className="text-h3 sm:text-h2 font-semibold text-gray-12 text-center">
        우리 동네 <span className="text-orange">사회적기업</span> 찾아보기
      </p>

      <p className="text-b5 sm:text-b3 text-gray-11 text-center whitespace-pre-line">
        사회적기업은, 판매 수익을 사회문제 해결이나
        {"\n"}이웃 돕기에 쓰는 특별한 기업들이에요.
        {"\n"}우리 동네 사회적기업을 찾아보고, 함께 참여해보세요!
      </p>
    </div>
  );
};

export default IntroModal;
