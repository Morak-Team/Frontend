import { postUserInfo } from "@/apis/recommend/postUserInfo";
import { useState } from "react";
import "@/styles/spinner.css";
import ErrorIcon from "/public/svgs/modal/errorIcon.svg?react";
import ToastModal from "@/components/common/ToastModal";

const Step6 = ({ onNext, defaultValue, userInfo, setRecommendResult }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    icon: null,
  });
  const fireToast = (message, icon = ErrorIcon, duration = 4000) => {
    setToast({ show: true, message, icon });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), duration);
  };

  const handleNext = async () => {
    try {
      setIsLoading(true);
      const response = await postUserInfo(userInfo);
      setRecommendResult(response);
      onNext();
    } catch (error) {
      console.error("추천 요청 실패:", error);
      fireToast("추천 결과를 불러오는 데 실패했어요.\n다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-white flex justify-center scrollbar-hide">
      {/* ✅ 로딩 오버레이 */}
      {isLoading && (
        <div className="absolute inset-0 z-50 bg-white bg-opacity-80 flex flex-col justify-center items-center">
          <div className="loader"></div>
          <p className="mt-4 text-gray-500 b5">잠시만 기다려주세요…</p>
        </div>
      )}

      <div className="w-full max-w-[760px] px-5 pt-8 pb-24 overflow-y-auto">
        <img src="/svgs/support/company/checkbox.svg" className="w-8 h-8" />
        <p className="h2 mt-8">
          기업 정보 등록이 <br /> 완료되었습니다.
        </p>
        <p className="b5 text-gray-9 mt-3">
          입력하신 정보로 맞춤 금융상품을 추천해드릴게요.
        </p>
      </div>

      <div className="fixed bottom-0 w-full max-w-[760px] flex justify-center bg-white py-4 shadow-md z-50">
        {!isLoading && (
          <button
            className="w-80 sm:w-[80%] bg-secondary b5 text-white py-3 rounded-xl"
            onClick={handleNext}
          >
            확인
          </button>
        )}
      </div>

      {toast.show && (
        <ToastModal
          message={toast.message}
          icon={toast.icon}
          duration={2000}
          onClose={() => setToast((t) => ({ ...t, show: false }))}
        />
      )}
    </div>
  );
};

export default Step6;
