import { useEffect, useState } from "react";

const useBottomOffset = (inputRef) => {
  const [bottomOffset, setBottomOffset] = useState(0);

  useEffect(() => {
    const inputEl = inputRef.current;
    inputEl?.focus();

    const handleResize = () => {
      requestAnimationFrame(() => {
        const height = window.visualViewport?.height || window.innerHeight;
        const offset = window.innerHeight - height;
        setBottomOffset(offset > 0 ? offset : 0);
      });
    };

    const fallbackResize = () => {
      setTimeout(() => {
        const offset =
          window.innerHeight - document.documentElement.clientHeight;
        setBottomOffset(offset > 0 ? offset : 300);
      }, 200);
    };

    const fallbackBlur = () => setBottomOffset(0);

    if ("visualViewport" in window) {
      window.visualViewport.addEventListener("resize", handleResize);
      window.visualViewport.addEventListener("scroll", handleResize);
    } else {
      inputEl?.addEventListener("focus", fallbackResize);
      inputEl?.addEventListener("blur", fallbackBlur);
      window.addEventListener("resize", fallbackResize);
    }

    return () => {
      if ("visualViewport" in window) {
        window.visualViewport.removeEventListener("resize", handleResize);
        window.visualViewport.removeEventListener("scroll", handleResize);
      } else {
        inputEl?.removeEventListener("focus", fallbackResize);
        inputEl?.removeEventListener("blur", fallbackBlur);
        window.removeEventListener("resize", fallbackResize);
      }
    };
  }, [inputRef]);

  return bottomOffset;
};

export default useBottomOffset;
