import { useState } from "react";
import checkIcon from "/svgs/support/company/checkIcon.svg";

const Step4 = ({ onNext, defaultValue }) => {
  const [interest, setInterest] = useState(defaultValue?.선호_이율_구조 || "");
  const [collateral, setCollateral] = useState(
    defaultValue?.담보_제공_가능_여부 || ""
  );

  const handleNext = () => {
    onNext({
      선호_이율_구조: interest,
      담보_제공_가능_여부: collateral,
    });
  };

  return (
    <div className="relative w-full min-h-screen bg-white flex justify-center scrollbar-hide">
      {/* 내용 영역 */}
      <div className="w-full max-w-[760px] px-5 pt-8 pb-24 overflow-y-auto">
        <p className="h2 mb-4 mt-30">
          희망하는 조건을 <br />
          선택해주세요
        </p>

        <p className="b4 text-gray-9 mt-12">선호 이율 구조</p>
        <div className="flex flex-wrap gap-2 mb-4 mt-4">
          {["고정금리", "변동금리", "상관없음"].map((item) => (
            <button
              key={item}
              className={`px-4 py-2 rounded-md border flex items-center gap-1
                ${
                  interest === item
                    ? "bg-secondaryBackground border-blue-500 b5 text-secondary3 font-medium"
                    : "b5 text-gray-9 bg-gray-3 border-transparent"
                }`}
              onClick={() => setInterest(item)}
            >
              {interest === item && (
                <img src={checkIcon} className="w-4 h-4" alt="check" />
              )}
              {item}
            </button>
          ))}
        </div>

        <p className="b4 text-gray-9 mt-12">담보 제공 가능 여부</p>
        <div className="flex flex-wrap gap-2 mb-8 mt-4">
          {["담보 제공 가능", "담보 제공 불가"].map((item) => (
            <button
              key={item}
              className={`px-4 py-2 rounded-md border flex items-center gap-1
                ${
                  collateral === item
                    ? "bg-secondaryBackground border-blue-500 b5 text-secondary3 font-medium"
                    : "b5 text-gray-9 bg-gray-3 border-transparent"
                }`}
              onClick={() => setCollateral(item)}
            >
              {collateral === item && (
                <img src={checkIcon} className="w-4 h-4" alt="check" />
              )}
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* 고정 하단 버튼 */}
      <div className="fixed bottom-0 w-full max-w-[760px] flex justify-center bg-white py-4 shadow-md z-50">
        <button
          className="w-80 sm:w-[80%] bg-secondary b5 text-white py-3 rounded-xl"
          onClick={handleNext}
          disabled={!interest || !collateral}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default Step4;
