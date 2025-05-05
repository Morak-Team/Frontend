import { ImgDone } from "@assets/svgs/signup";
import BackIcon from "/svgs/Ic_Arrow_Left.svg";

const GoHome = ({ onNext, onBack }) => {
  const handleSubmit = () => {
    onNext();
  };

  return (
    <div
      className="flex flex-col justify-between h-screen bg-cover bg-no-repeat bg-center px-6 pt-6 pb-10 relative"
      style={{
        backgroundImage: `url('${ImgDone}')`,
      }}
    >
      <button
        onClick={onBack}
        className="absolute top-6 left-4 sm:top-8 sm:left-6 z-10"
      >
        <img src={BackIcon} alt="뒤로가기 버튼" className="w-6 h-6" />
      </button>

      <div className="pt-24 px-1">
        <h1 className="text-h1 text-gray-12">
          가치있는 동네여행,
          <br />
          시작해볼까요?
        </h1>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full h-12 rounded-xl bg-white text-primary-8 text-b1 shadow-sm"
      >
        좋아요
      </button>
    </div>
  );
};

export default GoHome;
