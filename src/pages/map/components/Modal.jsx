import { useEffect, useState } from "react";

const Modal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("hasSeenReceiptGuide");

    if (!hasSeenModal) {
      setShowModal(true);
      localStorage.setItem("hasSeenReceiptGuide", "true");
    }
  }, []);

  if (!showModal) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-sm bg-white p-4 rounded-xl shadow-xl flex flex-col items-center">
      <button
        className="absolute top-2 right-2 text-gray-400"
        onClick={() => setShowModal(false)}
      >
        ✕
      </button>
      <img src="/icon-receipt.png" alt="icon" className="w-10 h-10 mb-2" />
      <h2 className="font-bold text-lg mb-1">
        영수증을 찍어 리뷰를 남겨보세요!
      </h2>
      <p className="text-sm text-gray-600 text-center">
        영수증 사진 한 장이면 따뜻한 리뷰가 시작돼요.
      </p>
    </div>
  );
};

export default Modal;
