import { reviewData } from "@/constants/review/reviewData";
import ReviewContent from "@/pages/map/components/ReviewContent";
import { Link } from "react-router-dom";
import { useGetStoreReviewCount, useStoreReviews } from "@/apis/review/queries";

const ReviewList = ({ setTurnOnCamera, companyId }) => {
  const { data: count, isLoading } = useGetStoreReviewCount(companyId);
  const { data: preview } = useStoreReviews(companyId);

  return (
    <div className="mb-20 px-5 sm:px-6">
      <div className="mt-10 flex justify-between mb-3">
        <div className="flex justify-center items-center gap-1">
          <h3 className="h3 text-gray-12">리뷰</h3>
          <span className="text-gray-6 b1">{count}개</span>
        </div>

        <button
          className="text-orange-500 flex justify-center items-center gap-1"
          onClick={() => setTurnOnCamera(true)}
        >
          <img src="/svgs/review/writeReviewIcon.svg" className="w-4 h-4" />
          <p className="b5 text-orange-500">리뷰 쓰기</p>
        </button>
      </div>

      {preview?.content?.map((item, idx) => (
        <ReviewContent item={item} key={idx} />
      ))}

      <div className="w-full flex justify-center mt-8">
        <Link
          to={`/review/${companyId}`}
          className="b4 text-gray-9 bg-gray-2 px-6 py-2 rounded-full"
        >
          리뷰 더보기
        </Link>
      </div>
    </div>
  );
};

export default ReviewList;
