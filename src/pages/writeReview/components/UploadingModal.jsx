import React from "react";

const UploadingModal = ({ message = "리뷰를 등록중입니다..." }) => {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/30 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg w-[300px] py-8 px-6 flex flex-col items-center text-center">
        <img
          src="/svgs/review/uploadReview.svg"
          alt="업로드 중"
          className="w-12 h-12 mb-4"
        />
        <p className="h4 text-gray-12">{message}</p>
      </div>
    </div>
  );
};

export default UploadingModal;
