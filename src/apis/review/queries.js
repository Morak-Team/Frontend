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

// 리뷰 전체보기 페이지에서 모든 리뷰를 가져오는 쿼리
// export const useInfiniteReviews = (storeId) => {
//   return useInfiniteQuery({
//     queryKey: ["reviews", storeId],
//     queryFn: ({ pageParam = 0 }) => getInfiniteReviews(storeId, pageParam),
//     initialPageParam: 0,
//     getNextPageParam: (lastPage) => {
//       // lastPage가 없거나, 마지막 페이지에 도달했으면 undefined 반환
//       if (!lastPage || lastPage.number + 1 >= lastPage.totalPages) {
//         return undefined;
//       }
//       return lastPage.number + 1;
//     },
//   });
// };

export const useInfiniteReviews = (companyId) => {
  return useInfiniteQuery({
    queryKey: ["reviews", companyId],
    // ⬇️ 여기를 수정:
    queryFn: ({ pageParam = 0 }) => {
      console.log("fetch page:", pageParam);
      return getInfiniteReviews(companyId, pageParam);
    },
    // 첫 페이지를 0으로
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      // API 응답에 lastPage.number 가 있습니다.
      const next = lastPage.number + 1;
      return next < lastPage.totalPages ? next : undefined;
    },
  });
};
