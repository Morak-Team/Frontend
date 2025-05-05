import { useState } from "react";
import checkIcon from "/svgs/support/company/checkIcon.svg";

const Step5 = ({ onNext, defaultValue }) => {
  const [condition, setCondition] = useState(
    defaultValue?.우대_조건_보유_항목 || []
  );

  const handleToggle = (item) => {
    setCondition((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleNext = () => {
    onNext({
      우대_조건_보유_항목: condition,
    });
  };

  const options = [
    "여성기업",
    "청년창업",
    "장애인 고용 기업",
    "기술보증기금 보증",
    "사회적기업",
    "예비사회적기업",
    "사회적협동조합",
    "마을기업",
    "소셜벤처 인증기업",
    "고용창출 기업",
    "지역특화산업 기업",
  ];

  return (
    <div className="relative w-full min-h-screen bg-white flex justify-center scrollbar-hide">
      <div className="w-full max-w-[760px] px-5 pt-8 pb-24 overflow-y-auto">
        <p className="h2 mb-4 mt-30">
          해당되는 우대 조건이 <br />
          있으신가요?
        </p>

        <p className="b4 text-gray-9 mt-12">우대 조건</p>
        <div className="flex flex-wrap gap-2 mb-4 mt-4">
          {options.map((item) => {
            const isSelected = condition.includes(item);
            return (
              <button
                key={item}
                className={`px-4 py-2 rounded-md border flex items-center gap-1
                  ${
                    isSelected
                      ? "bg-secondaryBackground border-blue-500 b5 text-secondary3 font-medium"
                      : "b5 text-gray-9 bg-gray-3 border-transparent"
                  }`}
                onClick={() => handleToggle(item)}
              >
                {isSelected && (
                  <img src={checkIcon} className="w-4 h-4" alt="check" />
                )}
                {item}
              </button>
            );
          })}
        </div>
        <p className="b5 text-secondary mt-4">중복 선택이 가능해요</p>
      </div>

      <div className="fixed bottom-0 w-full max-w-[760px] flex justify-center bg-white py-4 shadow-md z-50">
        <button
          className="w-80 sm:w-[80%] bg-secondary b5 text-white py-3 rounded-xl"
          onClick={handleNext}
          disabled={condition.length === 0}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default Step5;
