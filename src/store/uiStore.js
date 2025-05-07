import { create } from "zustand";

const useUIStore = create((set) => ({
  turnOnCamera: false,
  setTurnOnCamera: (value) => set({ turnOnCamera: value }),

  isBottomSheetOpen: false,
  setBottomSheetOpen: (value) => set({ isBottomSheetOpen: value }),

  isWriteReview: false,
  setIsWriteReview: (value) => set({ isWriteReview: value }),

  isStoryDetail: false,
  setIsStoryDetail: (value) => set({ isStoryDetail: value }),
}));

export default useUIStore;
