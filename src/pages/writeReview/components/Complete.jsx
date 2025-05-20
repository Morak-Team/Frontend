import { usePaymentStore } from "@/store/paymentStore";
import { useNavigate } from "react-router-dom";

const Complete = () => {
  const navigate = useNavigate();
  const { companyId } = usePaymentStore();
  return (
    <div className="relative w-full min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[760px] px-5 pt-8 sm:pt-14 pb-24 overflow-y-auto">
        {/* 닫기 버튼 */}
        <div
          className="flex justify-end cursor-pointer"
          onClick={() => navigate(`/review/${companyId}`)}
        >
          <img src="/svgs/review/xIcon.svg" className="w-8 h-8" />
        </div>

        {/* 제목 */}
        <div className="mt-6 mb-10 text-center">
          <p className="text-xl font-bold">
            <span className="h1 text-primary-8">리뷰 쓰기</span>
            <span className="h1 text-gray-12"> 완료!</span>
          </p>
          <p className="b5 text-gray-9 mt-2">소중한 온기가 전해졌어요 :)</p>
        </div>

        <div className="flex justify-center items-center">
          <img src="/svgs/review/temperLogo.svg" />
        </div>

        {/* 고정 하단 버튼 */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[760px] flex justify-center bg-white py-4 shadow-md z-50">
          <button
            onClick={() => navigate(`/review/${companyId}`)}
            className="w-80 sm:w-[77%] h-12 rounded-md px-6 py-3 text-white bg-primary-8 b1 border border-black"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Complete;
