import { useEffect } from "react";
import ReviewContent from "@/pages/map/components/ReviewContent";
import { useGetStoreReviewCount } from "@/apis/review/queries";
import { useInfiniteReviews } from "@/apis/review/queries";
import { useInView } from "react-intersection-observer";

const Reviews = ({ setTurnOnCamera, storeId }) => {
  const {
    data: countData = 0,
    isLoading: countLoading,
    error: countError,
  } = useGetStoreReviewCount(storeId);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: reviewsLoading,
    error: reviewsError,
  } = useInfiniteReviews(storeId);

  // 3) 스크롤 관찰자 세팅 (threshold, rootMargin)
  const { ref, inView } = useInView({
    threshold: 1.0,
    rootMargin: "0px 0px -200px 0px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 5) 로딩 & 에러 처리
  if (countLoading || reviewsLoading) {
    return <p className="text-center py-8">로딩 중...</p>;
  }
  if (countError) {
    return (
      <p className="text-center py-8">
        카운트 조회 중 오류: {countError.message}
      </p>
    );
  }
  if (reviewsError) {
    return (
      <p className="text-center py-8">
        리뷰 조회 중 오류: {reviewsError.message}
      </p>
    );
  }

  console.log("data confirm", data);
  const allReviews = data.pages[0];
  console.log(allReviews);

  return (
    <div className="mb-20">
      {/* 헤더 */}
      <div className="mt-10 flex justify-between mb-3">
        <div className="flex justify-center items-center gap-1">
          <h3 className="h3 text-gray-12">리뷰</h3>
          <span className="text-gray-6 b1">{countData}개</span>
        </div>

        <button
          className="text-orange-500 flex justify-center items-center gap-1"
          onClick={() => setTurnOnCamera(true)}
        >
          <img src="/svgs/review/writeReviewIcon.svg" className="w-4 h-4" />
          <p className="b5 text-orange-500">리뷰 쓰기</p>
        </button>
      </div>

      {/* 리뷰 리스트 */}
      <div className="space-y-6">
        {allReviews.map((item, idx) => (
          <ReviewContent item={item} key={idx} />
        ))}
      </div>

      {/* 인피니트 스크롤 관찰용 sentinel */}
      <div className="flex flex-col items-center mt-8 px-5">
        <div ref={ref} className="h-1" />
        {isFetchingNextPage && (
          <p className="py-2 text-gray-500">불러오는 중...</p>
        )}
        {!hasNextPage && (
          <p className="py-2 text-gray-500">모두 불러왔습니다.</p>
        )}

        {!hasNextPage || allReviews.length >= countData ? (
          <p className="py-2 text-gray-500">모두 불러왔습니다.</p>
        ) : null}
      </div>
    </div>
  );
};

export default Reviews;
