import { useNavigate } from "react-router-dom";

const HaveToLoginModal = ({
  message,
  subMessage,
  onClose,
  showButton = true,
  showClose = true,
}) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate("/auth");
  };

  return (
    <div className="fixed inset-0 z-[10001] flex justify-center items-center bg-black bg-opacity-30">
      <div
        className="bg-white rounded-xl shadow-xl w-[300px] py-8 px-6 flex flex-col items-center text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        {showClose && (
          <button
            className="absolute top-2 right-2 p-1 text-gray-500"
            onClick={onClose}
          >
            <img src="/svgs/review/xIcon.svg" className="w-5 h-5" alt="닫기" />
          </button>
        )}

        <img
          src="/svgs/support/consumer/Ic_Alert.svg"
          className="w-8 h-8 mb-3"
          alt="에러"
        />

        <p className="h4 text-gray-12 font-bold">{message}</p>
        {subMessage && <p className="mt-2 b5 text-gray-9">{subMessage}</p>}

        {showButton && (
          <button
            onClick={handleLogin}
            className="mt-5 px-4 py-2 b5 bg-primary-8 text-white rounded-lg"
          >
            로그인하러 가기
          </button>
        )}
      </div>
    </div>
  );
};

export default HaveToLoginModal;
