import { useState } from "react";
import XIcon from "/svgs/Ic_X_Btn.svg";
import BackIcon from "/svgs/Ic_Arrow_Left.svg";
import { IcCheck, IcNonCheck } from "@assets/svgs/signup/index";

const LocationStep = ({ onNext, onBack }) => {
  const [location, setLocation] = useState("서울특별시 ");
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => setLocation(e.target.value);
  const clearInput = () => setLocation("서울특별시 ");
  const toggleCheck = () => {
    setChecked((prev) => {
      const next = !prev;
      if (next) setLocation("");
      return next;
    });
  };

  const trimmed = location.trim();
  const isUserTyped = trimmed !== "" && trimmed !== "서울특별시";
  const isActive = isUserTyped || checked;

  const showWarning = trimmed === "" || !trimmed.startsWith("서울특별시");

  return (
    <div className="flex flex-col justify-start items-start h-screen pt-20 px-6 bg-white">
      <button
        onClick={onBack}
        className="absolute top-6 left-4 sm:top-8 sm:left-6 z-10"
      >
        <img src={BackIcon} alt="뒤로가기 버튼" className="w-6 h-6" />
      </button>

      <h1 className="text-2xl font-semibold mb-2">어느 동네에 사세요?</h1>
      <p className="text-sm text-gray-500 mb-8">
        가까운 사회적 기업을 추천해드릴게요.
      </p>

      <label
        htmlFor="location"
        className="text-sm font-medium text-gray-700 mb-1"
      >
        주소
      </label>

      <div className="relative w-full">
        <input
          id="location"
          type="text"
          value={location}
          onChange={handleChange}
          className={`w-full border-b-2 ${
            trimmed ? "border-orange-500" : "border-gray-300"
          } text-lg font-semibold py-2 pr-10 focus:outline-none`}
        />
        {location && (
          <button
            onClick={clearInput}
            className="absolute right-4 top-3"
            aria-label="입력 지우기"
          >
            <img src={XIcon} alt="지우기 버튼" className="w-4 h-4" />
          </button>
        )}
      </div>

      {showWarning && (
        <p className="text-sm text-orange-500 mt-2">
          현재는 서울에 한해 사회적 기업들을 소개하고 있습니다.
        </p>
      )}

      <button
        onClick={toggleCheck}
        className="flex items-center mt-6 active:opacity-80"
      >
        {checked ? (
          <IcCheck className="w-5 h-5 mr-2 text-[#FF6F31]" />
        ) : (
          <IcNonCheck className="w-5 h-5 mr-2 text-gray-400" />
        )}
        <span
          className={`text-sm ${checked ? "text-[#2E2D2B]" : "text-gray-400"}`}
        >
          현재 서울에 살고 있지 않습니다.
        </span>
      </button>

      <button
        disabled={!isActive}
        onClick={() => isActive && onNext(location)}
        className={`w-full max-w-[700px] h-12 mt-auto mb-6 font-semibold rounded-lg transition-colors ${
          isActive ? "bg-[#FF6F31] text-white" : "bg-gray-100 text-gray-400"
        }`}
      >
        확인
      </button>
    </div>
  );
};

export default LocationStep;
