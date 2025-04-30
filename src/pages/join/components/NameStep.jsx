import { useState, useRef } from "react";
import XIcon from "/svgs/Ic_X_Btn.svg";
import BackIcon from "/svgs/Ic_Arrow_Left.svg";
import useBottomOffset from "../hooks/useBottomOffset";

const NameStep = ({ onNext, onBack }) => {
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const bottomOffset = useBottomOffset(inputRef);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onNext(name);
  };

  const clearInput = () => setName("");

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-start mt-48 bg-white h-screen overflow-auto relative"
    >
      <button
        onClick={onBack}
        className="absolute top-6 left-4 sm:top-8 sm:left-6 z-10"
        aria-label="뒤로가기"
      >
        <img src={BackIcon} alt="뒤로가기 버튼" className="w-6 h-6" />
      </button>

      <section className="px-8">
        <h1 className="text-3xl font-semibold">이름을 입력해주세요.</h1>
        <p className="text-sm text-gray-500 mt-2">투명한 리뷰에 사용됩니다.</p>

        <div className="mt-8">
          <label
            id="name-label"
            htmlFor="name"
            className="block text-sm text-gray-700 mb-1.5"
          >
            이름
          </label>

          <div className="relative w-full">
            <input
              id="name"
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
              aria-labelledby="name-label"
              aria-required="true"
              className="w-full py-3 border-b-2 border-gray-200 focus:border-orange-500 pr-10 outline-none placeholder-gray-300 text-2xl font-semibold transition-colors duration-200"
            />
            {name && (
              <button
                type="button"
                onClick={clearInput}
                className="absolute right-6 top-1/2 -translate-y-1/2"
              >
                <img src={XIcon} alt="입력 삭제 버튼" className="w-7 h-7" />
              </button>
            )}
          </div>
        </div>
      </section>

      <div
        className="w-full max-w-[760px] fixed left-1/2 transform -translate-x-1/2"
        style={{
          bottom: bottomOffset,
          transition:
            bottomOffset > 0 ? "bottom 0.05s ease-out" : "bottom 0s ease-out",
        }}
      >
        <button
          type="submit"
          disabled={!name.trim()}
          className={`w-full py-6 text-center text-lg font-semibold ${
            name.trim()
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-400"
          }`}
        >
          확인
        </button>
      </div>
    </form>
  );
};

export default NameStep;
