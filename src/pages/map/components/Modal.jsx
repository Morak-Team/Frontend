import { useEffect, useState } from "react";

const Modal = ({ onClose }) => {
  return (
    <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-[10001] bg-white rounded-xl shadow-xl px-6 py-8 w-80 h-60 flex flex-col justify-between">
      <div className="w-full flex justify-between items-start">
        <img
          src="/public/images/review/reciptIcon.png"
          className="w-[60px] h-[60px]"
        />
        <button onClick={onClose} className="p-1 relative bottom-4 left-3">
          <img
            src="/public/images/review/xButtonIconForModal.png"
            className="w-6 h-6"
            alt="닫기"
          />
        </button>
      </div>

      <p className="h2 mb-1">
        영수증을 찍어 <br /> 리뷰를 남겨보세요!
      </p>
      <p className="b5">영수증 사진 한 장이면 따뜻한 리뷰가 시작돼요.</p>
    </div>
  );
};

export default Modal;
