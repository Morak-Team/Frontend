// src/apis/company/likeToggleCompany.js
import api from "@/apis/instance/api";

export const likeToggleCompany = async (companyId) => {
  try {
    if (!companyId) throw new Error("companyId is required");

    // 좋아요 해제 → 다시 누르면 좋아요 요청만 보내는 방식
    const res = await api.post("/company/save", { params: companyId });
    return res.data;
  } catch (err) {
    console.error("찜 요청 실패:", err);
    throw err;
  }
};
