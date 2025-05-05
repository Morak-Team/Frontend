import { useState } from "react";
import UploadingModal from "@/pages/writeReview/components/UploadingModal";
import { usePaymentStore } from "@/store/paymentStore";
import { useNavigate } from "react-router-dom";
import { postReview } from "@/apis/review/postReview";

const WriteText = ({ onNext, onBack }) => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const { reviewInfo } = usePaymentStore();
  const companyId = usePaymentStore((s) => s.companyId);
  const [isUploading, setIsUploading] = useState(false);
  console.log(text);

  const handleClick = async () => {
    setIsUploading(true); // 모달 띄우기

    try {
      await postReview(reviewInfo, companyId, text);
      setIsUploading(false); // 성공 시 닫기
      onNext();
    } catch (e) {
      console.log(e);
      setIsUploading(false); // 실패 시도 닫기
      alert("리뷰 등록에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[760px] px-5 pt-8 sm:pt-14 pb-24 overflow-y-auto">
        {isUploading && <UploadingModal message="리뷰를 등록중입니다..." />}
        {/* 닫기 버튼 */}
        <div
          className="flex justify-end"
          onClick={() => navigate(`/review/${companyId}`)}
        >
          <img src="/svgs/review/xIcon.svg" className="w-8 h-8" />
        </div>

        {/* 제목 */}
        <div className="mt-6 mb-10">
          <p className="text-xl font-bold text-center">
            <span className="h2 text-primary-8">이 장소</span>
            <span className="h2 text-gray-12">는 어떠셨나요?</span>
          </p>
        </div>

        {/* 닉네임: 버튼 기준 너비로 제한 */}
        <div className="flex justify-center">
          <div className="w-80 sm:w-[77%]">
            <div className="flex items-center gap-2">
              <img src="/svgs/review/profileIcon.svg" className="w-6 h-6" />
              <p className="b5">닉네임</p>
            </div>
          </div>
        </div>

        {/* 텍스트 입력 */}
        <div className="flex justify-center mt-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="리뷰를 작성해 주세요."
            className="w-80 sm:w-[77%] bg-gray-2 rounded-xl px-3 pt-3 pb-3 text-gray-900 min-h-[160px] resize-none outline-none 
              placeholder:text-gray-400 placeholder:pl-1"
          />
        </div>
      </div>

      {/* 고정 하단 버튼 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[760px] flex justify-center bg-white py-4 shadow-md z-50">
        <button
          onClick={handleClick}
          className="w-80 sm:w-[77%] h-12 rounded-md px-6 py-3 text-white bg-primary-8 b1 border border-black"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default WriteText;
