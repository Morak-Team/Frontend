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

export const useInfiniteReviews = (companyId) =>
  useInfiniteQuery({
    queryKey: ["allReviews", companyId],
    queryFn: ({ pageParam = 0 }) => getInfiniteReviews(companyId, pageParam),

    enabled: !!companyId, // companyId가 undefined인 초기 렌더 보호
    initialPageParam: 0,
    initialData: { pages: [], pageParams: [] }, // pages가 없어 length 참조 방지

    // **핵심 변경** – lastPage.last 가 true면 더 불러오지 않음
    getNextPageParam: (lastPage) => {
      // fetch가 아직 안 끝난 최초 호출: lastPage === undefined
      if (!lastPage) return undefined;

      // 서버 응답에 last=true 면 더 이상 페이지 없음
      if (lastPage.last) return undefined;

      // 그 외엔 다음 index 반환
      return lastPage.number + 1;
    },
  });
