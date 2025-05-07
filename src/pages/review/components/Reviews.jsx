import { useEffect, useState } from "react";
import ReviewContent from "@/pages/map/components/ReviewContent";
import { useGetStoreReviewCount } from "@/apis/review/queries";
import { useInfiniteReviews } from "@/apis/review/queries";
import { useInView } from "react-intersection-observer";
import { getMyProfile } from "@/apis/member/auth";
import HaveToLoginModal from "@/pages/map/components/HaveToLoginModal";

const Reviews = ({ setTurnOnCamera, companyId }) => {
  const {
    data: countData = 0,
    isLoading: countLoading,
    error: countError,
  } = useGetStoreReviewCount(companyId);

  const [loginModalConfig, setLoginModalConfig] = useState(null);

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

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: reviewsLoading,
    error: reviewsError,
  } = useInfiniteReviews(companyId);

  // 3) 스크롤 관찰자 세팅 (threshold, rootMargin)
  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: "0px",
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

  // 모든 페이지를 flatten
  const allReviews = data?.pages
    ? data.pages.flatMap((page) => page.content || [])
    : [];

  return (
    <div className="mb-20">
      {/* 헤더 */}
      <div className="mt-10 flex justify-between mb-3">
        <div className="flex justify-center items-center gap-1">
          <h3 className="h3 text-gray-12">리뷰</h3>
          <span className="text-gray-6 b1">{countData}개</span>
        </div>

        <button
          className="text-primary-8 flex justify-center items-center gap-1"
          onClick={handleClickWrite}
        >
          <img src="/svgs/review/writeReviewIcon.svg" className="w-4 h-4" />
          <p className="b5 text-primary-8">리뷰 쓰기</p>
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
        {/* {!hasNextPage && (
          <p className="py-2 text-gray-500">모두 불러왔습니다.</p>
        )}

        {!hasNextPage || allReviews.length >= countData ? (
          <p className="py-2 text-gray-500">모두 불러왔습니다.</p>
        ) : null} */}
      </div>

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

export default Reviews;
