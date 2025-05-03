import { useQuery } from "@tanstack/react-query";
import {
  getInfiniteReviews,
  getReviewsForPreview,
} from "@/apis/review/getReviews";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getReviewCount } from "@/apis/review/getReviewDetail";

// 바텀 시트 내부에서 보이는 약 5개 정도의 리뷰를 가져오는 쿼리
export const useStoreReviews = (companyId) => {
  return useQuery({
    queryKey: ["reviews", companyId],
    queryFn: () => getReviewsForPreview(companyId),
  });
};

// 가게의 리뷰 개수를 가져오는 쿼리
export const useGetStoreReviewCount = (companyId) => {
  return useQuery({
    queryKey: ["reviewCount", companyId],
    queryFn: () => getReviewCount(companyId),
  });
};

// 가게의 전체 리뷰 무한 스크롤 패칭 쿼리
export const useInfiniteReviews = (companyId) => {
  return useInfiniteQuery({
    queryKey: ["reviews", companyId],

    queryFn: ({ pageParam = 0 }) => {
      console.log("fetch page:", pageParam);
      return getInfiniteReviews(companyId, pageParam);
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const next = lastPage.number + 1;
      return next < lastPage.totalPages ? next : undefined;
    },
  });
};
