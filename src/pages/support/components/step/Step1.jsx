import { useState } from "react";
import checkIcon from "/svgs/support/company/checkIcon.svg";

const Step1 = ({ onNext, defaultValue }) => {
  const [industry, setIndustry] = useState(defaultValue?.업종 || "");
  const [companyType, setCompanyType] = useState(defaultValue?.기업형태 || "");

  const handleNext = () => {
    onNext({
      업종: industry,
      기업_형태: companyType,
    });
  };

  return (
    <div className="relative w-full min-h-screen bg-white flex justify-center scrollbar-hide">
      {/* 내용 영역 */}
      <div className="w-full max-w-[760px] px-5 pt-8 pb-24 overflow-y-auto">
        <p className="h2 mb-4 mt-30">
          기업 업종이 <br />
          어떻게 되시나요?
        </p>

        <p className="b4 text-gray-9 mt-12">업종</p>
        <div className="flex flex-wrap gap-2 mb-4 mt-4">
          {[
            "도소매업",
            "제조업",
            "IT",
            "식음료업",
            "교육업",
            "의료업",
            "기타",
          ].map((item) => (
            <button
              key={item}
              className={`px-4 py-2 rounded-md border flex items-center gap-1
                ${
                  industry === item
                    ? "bg-secondaryBackground border-blue-500 b5 text-secondary3 font-medium"
                    : "b5 text-gray-9 bg-gray-3 border-transparent"
                }`}
              onClick={() => setIndustry(item)}
            >
              {industry === item && (
                <img src={checkIcon} className="w-4 h-4" alt="check" />
              )}
              {item}
            </button>
          ))}
        </div>

        <p className="b4 text-gray-9 mt-12">기업 형태</p>
        <div className="flex flex-wrap gap-2 mb-8 mt-4">
          {[
            "사회적기업",
            "사회적협동조합",
            "마을기업",
            "협동조합",
            "예비사회적기업",
            "기타",
          ].map((item) => (
            <button
              key={item}
              className={`px-4 py-2 rounded-md border flex items-center gap-1
                ${
                  companyType === item
                    ? "bg-secondaryBackground border-blue-500 b5 text-secondary3 font-medium"
                    : "b5 text-gray-9 bg-gray-3 border-transparent"
                }`}
              onClick={() => setCompanyType(item)}
            >
              {companyType === item && (
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
          disabled={!industry || !companyType}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default Step1;
