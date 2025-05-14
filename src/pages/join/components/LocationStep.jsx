import { useState, useRef } from "react";
import XIcon from "/svgs/Ic_X_Btn.svg";
import BackIcon from "/svgs/Ic_Arrow_Left.svg";
import { IcCheck, IcNonCheck } from "@assets/svgs/signup";
import useBottomOffset from "../hooks/useBottomOffset";

const LocationStep = ({ onNext, onBack }) => {
  const [location, setLocation] = useState("");
  const [checked, setChecked] = useState(false);
  const inputRef = useRef(null);
  const bottomOffset = useBottomOffset(inputRef);

  const handleChange = (e) => setLocation(e.target.value);
  const clearInput = () => setLocation("");

  const toggleCheck = () => {
    setChecked((prev) => {
      const next = !prev;
      if (next) {
        setLocation("서울 외 지역 거주");
      } else {
        setLocation("");
      }
      return next;
    });
  };

  const trimmed = location.trim();
  const fullLocation = checked ? location : `서울특별시 ${location}`;
  const isUserTyped = trimmed !== "" && !checked;
  const isActive = isUserTyped || checked;

  const showWarningForSeoul =
    !checked &&
    (trimmed === "" || !`서울특별시 ${trimmed}`.startsWith("서울특별시"));
  const showNotSeoulMessage = checked;

  return (
    <div className="flex flex-col justify-start items-start h-screen mt-20 px-6 bg-white relative overflow-auto">
      <button
        onClick={onBack}
        className="absolute top-6 left-4 sm:top-8 sm:left-6 z-10"
      >
        <img src={BackIcon} alt="뒤로가기 버튼" className="w-6 h-6" />
      </button>

      <h1 className="h1 mb-2">어느 동네에 사세요?</h1>
      <p className="b5 text-gray-500 mb-8">
        가까운 사회적 기업을 추천해드릴게요.
      </p>

      <label
        htmlFor="location"
        className="b5 text-gray-8 mb-1"
      >
        주소
      </label>

      <div
        className={`relative w-full flex items-center border-b-2 ${
          trimmed || checked ? "border-primary-8" : "border-gray-6"
        } py-2`}
      >
        {!checked && (
          <span className="h2 text-gray-12 whitespace-nowrap">
            서울특별시&nbsp;
          </span>
        )}

        <input
          id="location"
          ref={inputRef}
          type="text"
          placeholder={!checked ? "마포구 서교동" : ""}
          value={location}
          onChange={handleChange}
          readOnly={checked}
          className={`flex-1 bg-transparent h2 focus:outline-none placeholder-gray-6 ${
            checked ? "bg-gray-6 cursor-not-allowed" : ""
          }`}
        />

        {!checked && location && (
          <button
            onClick={clearInput}
            className="absolute right-0 top-3"
            aria-label="입력 지우기"
          >
            <img src={XIcon} alt="지우기 버튼" className="w-4 h-4" />
          </button>
        )}
      </div>

      {(showWarningForSeoul || showNotSeoulMessage) && (
        <p className="b5 text-primary-8 mt-2">
          현재는 서울에 한해 사회적 기업들을 소개하고 있습니다.
        </p>
      )}

      <button
        onClick={toggleCheck}
        className="flex items-center mt-6 active:opacity-80"
      >
        {checked ? (
          <IcCheck className="w-5 h-5 mr-2 text-primary-8" />
        ) : (
          <IcNonCheck className="w-5 h-5 mr-2 text-gray-6" />
        )}
        <span className={`b5 ${checked ? "text-gray-12" : "text-gray-6"}`}>
          현재 서울에 살고 있지 않습니다.
        </span>
      </button>

      <div
        className="w-full max-w-[700px] fixed left-1/2 transform -translate-x-1/2"
        style={{
          bottom: bottomOffset,
          transition:
            bottomOffset > 0 ? "bottom 0.05s ease-out" : "bottom 0s ease-out",
        }}
      >
        <button
          disabled={!isActive}
          onClick={() => isActive && onNext(fullLocation)}
          className={`w-full h-12 mt-10 b1 font-semibold transition-colors ${
            isActive ? "bg-primary-8 text-white" : "bg-gray-4 text-white"
          }`}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default LocationStep;
