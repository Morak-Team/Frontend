import api from "@/apis/instance/api";

export const postReview = async (reviewInfo, companyId, text) => {
  try {
    const res = await api.post("/reviews/write", {
      // paymentInfoConfirmNum: reviewInfo.paymentInfoConfirmNum,
      // paymentInfoTime: reviewInfo.paymentInfoTime, // "2025-04-22T10:00:00"
      company: { companyId }, // { companyId: 1 }
      review: text,
      temperature: reviewInfo.temperature,
      reviewCategory: reviewInfo.reviewCategory,
    });
    return res.data;
  } catch (error) {
    console.error("[postReview] 리뷰 등록 실패:", error);
    // 선택적으로 사용자에게 에러 메시지를 보여주거나 오류 객체 반환 가능
    throw error;
  }
};
