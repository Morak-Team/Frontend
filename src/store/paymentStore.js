import { create } from "zustand";

// Date → "yyyy/MM/dd HH:mm:ss" 포맷 함수
export const formatToYMDHMS = (date) => {
  const pad = (n) => String(n).padStart(2, "0");
  const yyyy = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const HH = pad(date.getHours());
  const mm = pad(date.getMinutes());
  const ss = pad(date.getSeconds());
  return `${yyyy}/${MM}/${dd} ${HH}:${mm}:${ss}`;
};

export const usePaymentStore = create((set) => ({
  companyId: "", // 회사 ID
  reviewInfo: null, // 🆕 리뷰 정보 객체

  setReviewInfo: (info) =>
    set((state) => ({
      reviewInfo: {
        ...state.reviewInfo, // 기존 필드 유지
        ...info, // 새 필드 덮어쓰기
      },
    })),

  resetReviewInfo: () => {
    set({ reviewInfo: null });
  },

  setCompanyId: (id) => {
    set({ companyId: String(id) });
  },
}));
