import { useState, useEffect, useRef } from "react";
import XIcon from "/svgs/ic_X_Btn.svg";

const NameStep = ({ onNext }) => {
  const [name, setName] = useState("");
  const [bottomOffset, setBottomOffset] = useState(0);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onNext(name);
  };

  const clearInput = () => setName("");

  useEffect(() => {
    const inputEl = inputRef.current;

    const handleVisualViewportResize = () => {
      requestAnimationFrame(() => {
        const viewportHeight =
          window.visualViewport?.height || window.innerHeight;
        const offset = window.innerHeight - viewportHeight;
        setBottomOffset(offset > 0 ? offset : 0);
      });
    };

    const handleFocusFallback = () => {
      setTimeout(() => {
        const offset =
          window.innerHeight - document.documentElement.clientHeight;
        setBottomOffset(offset > 0 ? offset : 300);
      }, 200);
    };

    const handleBlurFallback = () => {
      setBottomOffset(0);
    };

    if ("visualViewport" in window) {
      window.visualViewport.addEventListener(
        "resize",
        handleVisualViewportResize
      );
      window.visualViewport.addEventListener(
        "scroll",
        handleVisualViewportResize
      );
    } else {
      inputEl?.addEventListener("focus", handleFocusFallback);
      inputEl?.addEventListener("blur", handleBlurFallback);
      window.addEventListener("resize", handleFocusFallback);
    }

    return () => {
      if ("visualViewport" in window) {
        window.visualViewport.removeEventListener(
          "resize",
          handleVisualViewportResize
        );
        window.visualViewport.removeEventListener(
          "scroll",
          handleVisualViewportResize
        );
      } else {
        inputEl?.removeEventListener("focus", handleFocusFallback);
        inputEl?.removeEventListener("blur", handleBlurFallback);
        window.removeEventListener("resize", handleFocusFallback);
      }
    };
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-start pt-48 bg-white h-screen overflow-auto relative"
    >
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
          className={`w-full py-6 text-center text-white text-lg font-semibold ${
            name.trim() ? "bg-orange-500" : "bg-gray-200 text-gray-400"
          }`}
        >
          확인
        </button>
      </div>
    </form>
  );
};

export default NameStep;
