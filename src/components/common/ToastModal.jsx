import React, { useEffect } from "react";
import { IcCheck } from "@assets/svgs/signup";

const ToastModal = ({
  icon,
  message = "저장되었습니다.",
  duration = 1300,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const IconComponent = icon || IcCheck;

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center">
      <div className="absolute inset-0 bg-Scrim  pointer-events-none" />

      <div className="relative flex items-center bg-white px-4 py-3 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.08)] min-w-[240px] max-w-[90vw]">
        <IconComponent className="w-6 h-6 mr-3" />
        <span className="text-b1 text-gray-12 font-semibold whitespace-nowrap">
          {message}
        </span>
      </div>
    </div>
  );
};

export default ToastModal;
