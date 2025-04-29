const IntroModal = ({ onClose }) => {
  return (
    <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-[10001] w-full max-w-[360px] px-6 py-10 bg-white rounded-xl shadow flex flex-col gap-4">
      <button onClick={onClose} className="absolute top-4 right-4">
        <img src="/svgs/Ic_X.svg" alt="닫기" className="w-6 h-6" />
      </button>

      <p className="text-xl font-semibold text-zinc-900">
        우리 동네 <span className="text-orange-500">사회적기업</span> 찾아보기
      </p>

      <p className="text-sm text-zinc-700 leading-5">
        사회적기업은, 판매 수익을 사회문제 해결이나 <br />
        이웃 돕기에 쓰는 특별한 기업들이에요.
        <br />
        우리 동네 사회적기업을 찾아보고, 함께 참여해보세요!
      </p>
    </div>
  );
};

export default IntroModal;
