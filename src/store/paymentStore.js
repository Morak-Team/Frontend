// src/store/paymentStore.js
import { create } from "zustand";

// Date → "yyyy/MM/dd HH:mm:ss" 포맷 함수
const formatToYMDHMS = (date) => {
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
  // 상태 필드
  paymentTime: "", // "yyyy/MM/dd HH:mm:ss"
  companyId: "", // 회사 ID
  temperature: null, // 온도 (number)
  reviewTags: [], // 태그 배열

  // 액션들
  setPaymentTime: (raw) => {
    const dateObj = raw instanceof Date ? raw : new Date(raw);
    if (isNaN(dateObj.getTime())) {
      console.warn("[paymentStore] Invalid date:", raw);
      return;
    }
    set({ paymentTime: formatToYMDHMS(dateObj) });
  },

  setCompanyId: (id) => {
    set({ companyId: String(id) });
  },

  setTemperature: (temp) => {
    const num = Number(temp);
    if (isNaN(num)) {
      console.warn("[paymentStore] Invalid temperature:", temp);
      return;
    }
    set({ temperature: num });
  },

  // 태그 배열 전체를 한 번에 설정
  setReviewTags: (tags) => {
    if (!Array.isArray(tags)) {
      console.warn("[paymentStore] reviewTags must be an array:", tags);
      return;
    }
    set({ reviewTags: tags });
  },

  // 초기화
  resetReviewInfo: () => {
    set({
      paymentTime: "",
      companyId: "",
      temperature: null,
      reviewTags: [],
    });
  },
}));
