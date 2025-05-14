import { useState } from "react";
import ReviewContent from "@/pages/map/components/review/ReviewContent";
import { Link, useNavigate } from "react-router-dom";
import { useGetStoreReviewCount, useStoreReviews } from "@/apis/review/queries";
import { getMyProfile } from "@/apis/member/auth";
import HaveToLoginModal from "@/components/common/HaveToLoginModal";

const ReviewList = ({ setTurnOnCamera, companyId }) => {
  const navigate = useNavigate();
  const { data: count, isLoading } = useGetStoreReviewCount(companyId);
  const { data: preview } = useStoreReviews(companyId);
  const [loginModalConfig, setLoginModalConfig] = useState(null); // 모달 상태를 객체로 관리

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
        setLoginModalConfig({
          message: "로그인이 필요한 기능입니다",
          subMessage: "",
          showButton: true,
        });
      } else {
        setLoginModalConfig({
          message: "사용자 정보를 확인할 수 없습니다",
          subMessage: "다시 시도해 주세요",
          showButton: false,
        });
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

      {!(count === 0) && (
        <div className="w-full flex justify-center mt-8">
          <Link
            to={`/review/${companyId}`}
            className="b4 text-gray-9 bg-gray-2 px-6 py-2 rounded-full"
          >
            리뷰 더보기
          </Link>
        </div>
      )}

      {count === 0 && (
        <div className="flex flex-col mt-24 justify-center items-center text-center mb-28">
          <img src="/svgs/storeReview/review0.svg" className="w-24 h-16" />
          <p className="h4 text-gray-9 mt-12">
            이 기업에 <br />첫 리뷰를 남겨보세요!
          </p>
        </div>
      )}

      {/* 로그인 모달 */}
      {loginModalConfig && (
        <HaveToLoginModal
          message={loginModalConfig.message}
          subMessage={loginModalConfig.subMessage}
          showButton={loginModalConfig.showButton}
          onClose={() => setLoginModalConfig(null)}
        />
      )}
    </div>
  );
};

export default ReviewList;
