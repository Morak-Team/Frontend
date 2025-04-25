import { create } from "zustand";

const useUIStore = create((set) => ({
  turnOnCamera: false,
  setTurnOnCamera: (value) => set({ turnOnCamera: value }),

  isBottomSheetOpen: false,
  setBottomSheetOpen: (value) => set({ isBottomSheetOpen: value }),
}));

export default useUIStore;
