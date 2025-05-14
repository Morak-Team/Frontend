import { useState } from "react";
import BackIcon from "/svgs/Ic_Arrow_Left.svg";
import { IcCheck, IcUnselected } from "@assets/svgs/signup";

const OwnerStep = ({ onNext, onBack }) => {
  const [selected, setSelected] = useState(null);

  const options = [
    { label: "아니요.", value: "consumer" },
    { label: "네, 사회적 기업을 운영하고 있어요.", value: "corporate" },
  ];

  const handleSubmit = () => {
    if (selected) {
      onNext(selected);
    }
  };

  return (
    <div className="flex flex-col justify-start h-screen bg-white px-6 pt-40">
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-[760px] px-4 sm:px-6 z-50">
        <button onClick={onBack} aria-label="뒤로가기" className="w-8 h-8">
          <img src={BackIcon} alt="뒤로가기 버튼" className="w-8 h-8" />
        </button>
      </div>

      <h1 className="h1 mb-10">
        사회적기업의 사장님이신가요?
      </h1>

      <div className="flex flex-col gap-4">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelected(option.value)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-start transition-shadow ${
              selected === option.value
                ? "shadow-[0px_2px_12px_rgba(46,45,43,0.05)] bg-white"
                : ""
            }`}
          >
            {selected === option.value ? (
              <IcCheck className="w-5 h-5 text-black" />
            ) : (
              <IcUnselected className="w-5 h-5 text-black" />
            )}
            <span className="text-base font-medium">{option.label}</span>
          </button>
        ))}
      </div>

      <button
        disabled={!selected}
        onClick={handleSubmit}
        className={`w-full max-w-[700px] h-12 mt-auto mb-6 font-semibold rounded-lg transition-colors ${
          selected ? "bg-primary-8 text-white" : "bg-gray-4 text-white"
        }`}
      >
        확인
      </button>
    </div>
  );
};

export default OwnerStep;
