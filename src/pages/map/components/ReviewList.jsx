import { reviewData } from "@/constants/review/reviewData";
import ReviewContent from "@/pages/map/components/ReviewContent";
import { Link } from "react-router-dom";

const ReviewList = ({ setTurnOnCamera, storeId }) => {
  return (
    <>
      <div className="mt-10 flex justify-between">
        <div className="flex justify-center items-center gap-2">
          <h3 className="font-semibold text-xl">리뷰</h3>
          <span>27개</span>
        </div>

        <button
          className="text-sm text-orange-500"
          onClick={() => setTurnOnCamera(true)}
        >
          ✏️ 리뷰 쓰기
        </button>
      </div>
      <h1 className="text-lg font-bold mb-5">온도 98도</h1>
      {reviewData.map((item, idx) => (
        <ReviewContent item={item} idx={idx} />
      ))}

      <div className="mt-auto py-6">
        <div className="flex justify-center text-xl">
          <Link to={`/review/${storeId}`} className="text-orange-500">
            리뷰 전체보기
          </Link>
        </div>
      </div>
    </>
  );
};

export default ReviewList;
