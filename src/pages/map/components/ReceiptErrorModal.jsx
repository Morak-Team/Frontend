// ReceiptErrorModal.jsx
const ReceiptErrorModal = ({ message, subMessage, onClose }) => {
  return (
    <div className="fixed inset-0 z-[10001] bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-xl w-[300px] py-8 px-6 flex flex-col items-center text-center relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700"
        >
          <img src="/svgs/review/xIcon.svg" className="w-5 h-5" alt="닫기" />
        </button>
        <img
          src="/svgs/review/warningIcon.svg"
          alt="오류"
          className="w-12 h-12 mb-4"
        />
        <p className="h4 text-gray-12 font-bold">{message}</p>
        <p className="b5 mt-2 text-gray-600">{subMessage}</p>
      </div>
    </div>
  );
};

export default ReceiptErrorModal;
