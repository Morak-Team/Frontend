import { useQuery } from "@tanstack/react-query";
import {
  getTopRatedMovies,
  getInfiniteReviews,
  getReviewsForPreview,
} from "@/apis/review/getReviews";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getReviewCount, getTemperature } from "@/apis/review/getReviewDetail";

// 바텀 시트 내부에서 보이는 약 5개 정도의 리뷰를 가져오는 쿼리
export const useStoreReviews = (storeId) => {
  return useQuery({
    queryKey: ["reviews", storeId],
    queryFn: () => getReviewsForPreview(storeId),
  });
};

// 가게의 온도를 가져오는 쿼리
export const useGetStoreTemperature = (storeId) => {
  return useQuery({
    queryKey: ["temperature", storeId],
    queryFn: () => getTemperature(storeId),
  });
};

// 가게의 리뷰 개수를 가져오는 쿼리
export const useGetStoreReviewCount = (storeId) => {
  return useQuery({
    queryKey: ["reviewCount", storeId],
    queryFn: () => getReviewCount(storeId),
  });
};

// 리뷰 전체보기 페이지에서 모든 리뷰를 가져오는 쿼리
export const useInfiniteReviews = (storeId) => {
  return useInfiniteQuery({
    queryKey: ["reviews", storeId],
    queryFn: ({ pageParam }) => getInfiniteReviews(storeId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (last) => {
      if (last.page < last.total_pages) {
        return last.page + 1;
      }
      return undefined;
    },
  });
};

// 연습용 영화 데이터 무한 스크롤 패칭 쿼리
export const useInfinitePractice = (storeId) => {
  return useInfiniteQuery({
    queryKey: ["top-rated"],
    queryFn: ({ pageParam }) => getTopRatedMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: (last) => {
      if (last.page < last.total_pages) {
        return last.page + 1;
      }
      return undefined;
    },
  });
};
