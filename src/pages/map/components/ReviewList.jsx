import { reviewData } from "@/constants/review/reviewData";
import ReviewContent from "@/pages/map/components/ReviewContent";
import { Link } from "react-router-dom";
import { useGetStoreReviewCount, useStoreReviews } from "@/apis/review/queries";
import { useMyProfile } from "@/apis/member/queries";
import { useNavigate } from "react-router-dom";
import { getMyProfile } from "@/apis/member/auth";

const ReviewList = ({ setTurnOnCamera, companyId }) => {
  const navigate = useNavigate();
  const { data: count, isLoading } = useGetStoreReviewCount(companyId);
  const { data: preview } = useStoreReviews(companyId);

  const handleClickWrite = async () => {
    try {
      const res = await getMyProfile(); // auth가 200일 때만 통과
      if (res?.name) {
        setTurnOnCamera(true); // 명시적으로 인증 성공 시에만 실행
      } else {
        throw new Error("사용자 인증 실패");
      }
    } catch (e) {
      if (e?.response?.status === 401) {
        alert("로그인이 필요합니다.");
        navigate("/auth");
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
    </div>
  );
};

export default ReviewList;
