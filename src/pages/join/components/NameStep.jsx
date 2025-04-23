import { useState, useEffect } from "react";
import XIcon from "/svgs/ic_X_Btn.svg";

const NameStep = ({ onNext }) => {
  const [name, setName] = useState("");
  const [bottomOffset, setBottomOffset] = useState(0);

  const handleNext = () => {
    if (!name.trim()) return;
    onNext(name);
  };

  const clearInput = () => setName("");

  // 키보드 감지: visualViewport로 하단의 확인 버튼 위치 조정
  useEffect(() => {
    const handleResize = () => {
      requestAnimationFrame(() => {
        const viewportHeight =
          window.visualViewport?.height || window.innerHeight;
        const offset = window.innerHeight - viewportHeight;
        setBottomOffset(offset > 0 ? offset : 0);
      });
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    window.visualViewport?.addEventListener("scroll", handleResize);

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("scroll", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col justify-start pt-48 bg-white h-screen overflow-auto relative">
      <section className="px-8">
        <h1 className="text-3xl font-semibold">이름을 입력해주세요.</h1>
        <p className="text-sm text-gray-500 mt-2">투명한 리뷰에 사용됩니다.</p>

        <div className="mt-8">
          <label htmlFor="name" className="block text-sm text-gray-700 mb-1.5">
            이름
          </label>

          <div className="relative w-full">
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
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
        className="w-full max-w-[760px] fixed left-0"
        style={{
          bottom: bottomOffset,
          transition:
            bottomOffset > 0 ? "bottom 0.05s ease-out" : "bottom 0s ease-out",
        }}
      >
        <button
          onClick={handleNext}
          disabled={!name.trim()}
          className={`w-full py-6 text-center text-white text-lg font-semibold ${
            name.trim() ? "bg-orange-500" : "bg-gray-200 text-gray-400"
          }`}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default NameStep;
