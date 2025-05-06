import { useState } from "react";
import checkIcon from "/svgs/support/company/checkIcon.svg";

const Step2 = ({ onNext, defaultValue }) => {
  const [size, setSize] = useState(defaultValue?.기업_규모 || "");
  const [revenue, setRevenue] = useState(defaultValue?.연매출 || "");

  const handleNext = () => {
    onNext({
      기업_규모: size,
      연매출: revenue,
    });
  };

  return (
    <div className="relative w-full min-h-screen bg-white flex justify-center scrollbar-hide">
      {/* 내용 영역 */}
      <div className="w-full max-w-[760px] px-5 pt-8 pb-24 overflow-y-auto">
        <p className="h2 mb-4 mt-30">
          기업 규모가 <br />
          어떻게 되시나요?
        </p>

        <p className="b4 text-gray-9 mt-12">기업 규모</p>
        <div className="flex flex-wrap gap-2 mb-4 mt-4">
          {["소기업", "중소기업", "중견기업"].map((item) => (
            <button
              key={item}
              className={`px-4 py-2 rounded-md border flex items-center gap-1
                ${
                  size === item
                    ? "bg-secondaryBackground border-blue-500 b5 text-secondary3 font-medium"
                    : "b5 text-gray-9 bg-gray-3 border-transparent"
                }`}
              onClick={() => setSize(item)}
            >
              {size === item && (
                <img src={checkIcon} className="w-4 h-4" alt="check" />
              )}
              {item}
            </button>
          ))}
        </div>

        <p className="b4 text-gray-9 mt-12">연 매출</p>
        <div className="flex flex-wrap gap-2 mb-8 mt-4">
          {["1억 미만", "1~5억", "5~10억", "10억 이상"].map((item) => (
            <button
              key={item}
              className={`px-4 py-2 rounded-md border flex items-center gap-1
                ${
                  revenue === item
                    ? "bg-secondaryBackground border-blue-500 b5 text-secondary3 font-medium"
                    : "b5 text-gray-9 bg-gray-3 border-transparent"
                }`}
              onClick={() => setRevenue(item)}
            >
              {revenue === item && (
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
          disabled={!size || !revenue}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default Step2;
