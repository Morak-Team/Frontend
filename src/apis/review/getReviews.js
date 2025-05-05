import api from "@/apis/instance/api";

// 바텀시트 내부 약 3개의 리뷰 패칭
export const getReviewsForPreview = async (companyId) => {
  const res = await api.get("/reviews/public/get-company-reviews", {
    params: { companyId, size: 3 },
  });

  return res.data;
};

// 모든 리뷰 페이지 무한 스크롤 쿼리
export const getInfiniteReviews = async (companyId, page) => {
  const res = await api.get("/reviews/public/get-company-reviews", {
    params: { companyId: companyId, page, size: 10 },
  });
  return res.data;
};
