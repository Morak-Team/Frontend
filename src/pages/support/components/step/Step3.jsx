import { useState } from "react";
import checkIcon from "/svgs/support/company/checkIcon.svg";

const Step3 = ({ onNext, defaultValue }) => {
  const [amount, setAmount] = useState(defaultValue?.필요금액 || "");
  const [service, setService] = useState(defaultValue?.필요_서비스_종류 || "");

  const handleNext = () => {
    onNext({
      필요금액: amount,
      필요_서비스_종류: service,
    });
  };

  return (
    <div className="relative w-full min-h-screen bg-white flex justify-center scrollbar-hide">
      {/* 내용 영역 */}
      <div className="w-full max-w-[760px] px-5 pt-8 pb-24 overflow-y-auto">
        <p className="h2 mb-4 mt-30">
          어떤 금융 지원이 <br />
          필요하신가요?
        </p>

        <p className="b4 text-gray-9 mt-12">지원 금액</p>
        <div className="flex flex-wrap gap-2 mb-4 mt-4">
          {[
            "~1000만 원",
            "~3000만 원",
            "~5000만 원",
            "~1억 원",
            "1억 원 이상",
          ].map((item) => (
            <button
              key={item}
              className={`px-4 py-2 rounded-md border flex items-center gap-1
                ${
                  amount === item
                    ? "bg-secondaryBackground border-blue-500 b5 text-secondary3 font-medium"
                    : "b5 text-gray-9 bg-gray-3 border-transparent"
                }`}
              onClick={() => setAmount(item)}
            >
              {amount === item && (
                <img src={checkIcon} className="w-4 h-4" alt="check" />
              )}
              {item}
            </button>
          ))}
        </div>

        <p className="b4 text-gray-9 mt-12">지원 종류</p>
        <div className="flex flex-wrap gap-2 mb-8 mt-4">
          {["대출", "투자", "보증", "컨설팅", "상관없음"].map((item) => (
            <button
              key={item}
              className={`px-4 py-2 rounded-md border flex items-center gap-1
                ${
                  service === item
                    ? "bg-secondaryBackground border-blue-500 b5 text-secondary3 font-medium"
                    : "b5 text-gray-9 bg-gray-3 border-transparent"
                }`}
              onClick={() => setService(item)}
            >
              {service === item && (
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
          disabled={!amount || !service}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default Step3;
