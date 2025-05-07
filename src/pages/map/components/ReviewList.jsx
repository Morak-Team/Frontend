import { useState } from "react";
import { reviewData } from "@/constants/review/reviewData";
import ReviewContent from "@/pages/map/components/ReviewContent";
import { Link, useNavigate } from "react-router-dom";
import { useGetStoreReviewCount, useStoreReviews } from "@/apis/review/queries";
import { getMyProfile } from "@/apis/member/auth";
import HaveToLoginModal from "@/pages/map/components/HaveToLoginModal";

const ReviewList = ({ setTurnOnCamera, companyId }) => {
  const navigate = useNavigate();
  const { data: count, isLoading } = useGetStoreReviewCount(companyId);
  const { data: preview } = useStoreReviews(companyId);
  const [showLoginModal, setShowLoginModal] = useState(false); // ✅ 모달 상태

  const handleClickWrite = async () => {
    try {
      const res = await getMyProfile();
      if (res?.name) {
        setTurnOnCamera(true);
      } else {
        throw new Error("인증 실패");
      }
    } catch (e) {
      if (e?.response?.status === 401) {
        setShowLoginModal(true); // ✅ 모달 표시
      } else {
        alert("사용자 정보를 확인할 수 없습니다.");
      }
    }
  };

  return (
    <div className="mb-20 px-5 sm:px-6">
      <div className="mt-10 flex justify-between mb-3">
        <div className="flex justify-center items-center gap-1">
          <h3 className="h3 text-gray-12">리뷰</h3>
          <span className="text-gray-6 b1">{count}개</span>
        </div>

        <button
          className="text-primary-8 flex justify-center items-center gap-1"
          onClick={handleClickWrite}
        >
          <img src="/svgs/review/writeReviewIcon.svg" className="w-4 h-4" />
          <p className="b5 text-primary-8">리뷰 쓰기</p>
        </button>
      </div>

      {preview?.content?.map((item, idx) => (
        <ReviewContent item={item} key={idx} />
      ))}

      {!(count == 0) && (
        <div className="w-full flex justify-center mt-8">
          <Link
            to={`/review/${companyId}`}
            className="b4 text-gray-9 bg-gray-2 px-6 py-2 rounded-full"
          >
            리뷰 더보기
          </Link>
        </div>
      )}

      {/* ✅ 로그인 모달 */}
      {showLoginModal && (
        <HaveToLoginModal
          message="로그인이 필요한 기능입니다"
          subMessage=""
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
};

export default ReviewList;
