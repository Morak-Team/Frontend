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
        <h1 className="text-h1 font-semibold text-gray-12">이름을 입력해주세요.</h1>
        <p className="text-b5 text-gray-9 mt-2">투명한 리뷰에 사용됩니다.</p>

        <div className="mt-8">
          <label
            id="name-label"
            htmlFor="name"
            className="block text-b5 text-gray-8 mb-1.5"
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
              className="w-full py-3 border-b-2 border-gray-4 focus:border-primary-8 pr-10 outline-none placeholder-gray-3 text-2xl font-h3 transition-colors duration-200"
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
          className={`w-full py-6 text-center text-b1 font-semibold ${
            name.trim()
              ? "bg-primary-8 text-white"
              : "bg-gray-4 text-white"
          }`}
        >
          확인
        </button>
      </div>
    </form>
  );
};

export default NameStep;
