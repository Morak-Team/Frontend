import { useState } from "react";

const Step6 = ({ onNext, defaultValue }) => {
  const [condition, setCondition] = useState(
    defaultValue?.우대_조건_보유_항목 || []
  );

  const handleNext = () => {
    onNext({
      우대_조건_보유_항목: condition,
    });
  };

  return (
    <div className="relative w-full min-h-screen bg-white flex justify-center scrollbar-hide">
      <div className="w-full max-w-[760px] px-5 pt-8 pb-24 overflow-y-auto">
        <img src="/svgs/support/company/checkbox.svg" className="w-8 h-8" />
        <p className="h2 mt-8">
          기업 정보 등록이 <br /> 완료되었습니다.
        </p>
        <p className="b5 text-gray-9 mt-3">
          입력하신 정보로 맞춤 금융상품을 추천해드릴게요.
        </p>
      </div>
      <div className="fixed bottom-0 w-full max-w-[760px] flex justify-center bg-white py-4 shadow-md z-50">
        <button
          className="w-80 sm:w-[80%] bg-secondary b5 text-white py-3 rounded-xl"
          onClick={handleNext}
          disabled={condition.length === 0}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Step6;
