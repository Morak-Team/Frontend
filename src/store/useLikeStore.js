import { create } from "zustand";

const useLikeStore = create((set) => ({
  likedMap: {},
  setLike: (companyId, liked) =>
    set((state) => ({
      likedMap: {
        ...state.likedMap,
        [companyId]: liked,
      },
    })),
}));

export default useLikeStore;
