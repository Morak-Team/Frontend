import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const FireTemperatureSlider = ({ temperature, setTemperature }) => {
  const fireRef = useRef(null);
  const startYRef = useRef(0);
  const startTempRef = useRef(temperature);

  const handleStart = (clientY) => {
    startYRef.current = clientY;
    startTempRef.current = temperature;
  };

  const handleMove = (clientY) => {
    const delta = startYRef.current - clientY;
    const tempDelta = delta / 2; // 감도
    const newTemp = Math.min(
      100,
      Math.max(0, startTempRef.current + tempDelta)
    );
    setTemperature(newTemp.toFixed(0));
  };

  const handleTouchStart = (e) => {
    handleStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientY);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    handleStart(e.clientY);

    const move = (e) => handleMove(e.clientY);
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientY);
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };
  return (
    <div
      ref={fireRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onMouseDown={handleMouseDown}
      className="w-52 h-56 touch-none"
    >
      <p className="h1 text-primary-8 text-center">
        {Math.round(temperature)}도
      </p>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 196 197"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M114.012 25C106.255 40.1088 108.949 59.7912 121.115 71.7148C126.341 76.86 132.547 80.3713 138.018 85.2715C140.141 87.3949 142.427 89.5187 144.305 91.9688C144.335 92.0118 148.883 98.5145 150.592 102.259L151.654 104.382C159.329 123.002 154.103 144.727 139.16 158.284C125.77 170.371 107.071 173.556 89.5979 171.351C73.186 169.309 57.9172 159.182 49.0989 145.054C46.6493 140.725 44.4451 135.825 43.302 130.925C41.914 126.842 41.4237 122.758 40.9338 118.675C39.8723 100.953 47.3029 82.1685 60.9387 71.0615C54.7332 84.4552 56.2023 101.197 65.4289 112.876C65.7211 113.405 66.1091 113.876 66.5725 114.265C68.1238 115.571 70.0833 116.061 71.9612 115.244C73.5941 114.591 74.8194 112.958 74.8196 111.161C74.8196 110.1 74.4928 109.282 74.1662 108.466C64.2047 82.7401 72.5331 52.7674 93.6809 35.7803C99.4781 31.1252 106.255 26.8784 114.012 25Z"
          fill="#EBEAE9"
        />
        <motion.path
          d="M114.012 25C106.255 40.1088 108.949 59.7912 121.115 71.7148C126.341 76.86 132.547 80.3713 138.018 85.2715C140.141 87.3949 142.427 89.5187 144.305 91.9688C144.335 92.0118 148.883 98.5145 150.592 102.259L151.654 104.382C159.329 123.002 154.103 144.727 139.16 158.284C125.77 170.371 107.071 173.556 89.5979 171.351C73.186 169.309 57.9172 159.182 49.0989 145.054C46.6493 140.725 44.4451 135.825 43.302 130.925C41.914 126.842 41.4237 122.758 40.9338 118.675C39.8723 100.953 47.3029 82.1685 60.9387 71.0615C54.7332 84.4552 56.2023 101.197 65.4289 112.876C65.7211 113.405 66.1091 113.876 66.5725 114.265C68.1238 115.571 70.0833 116.061 71.9612 115.244C73.5941 114.591 74.8194 112.958 74.8196 111.161C74.8196 110.1 74.4928 109.282 74.1662 108.466C64.2047 82.7401 72.5331 52.7674 93.6809 35.7803C99.4781 31.1252 106.255 26.8784 114.012 25Z"
          fill="#FF7A00"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{
            clipPath: `inset(${100 - temperature}% 0 0 0)`,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
        />
      </svg>
    </div>
  );
};

export default FireTemperatureSlider;
