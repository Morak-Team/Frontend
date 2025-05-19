import api from "@/apis/instance/api";

export const postReview = async (reviewInfo, companyId, text) => {
  try {
    const res = await api.post("/reviews/write", {
      paymentInfoConfirmNum: reviewInfo.paymentInfoConfirmNum,
      paymentInfoTime: reviewInfo.paymentInfoTime,
      companyId: companyId,
      review: text,
      temperature: reviewInfo.temperature,
      reviewCategories: reviewInfo.reviewCategory,
    });
    return res.data;
  } catch (error) {
    console.error("[postReview] 리뷰 등록 실패:", error);

    throw error;
  }
};
