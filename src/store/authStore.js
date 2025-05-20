import { create } from "zustand";
import { getMyProfile } from "@apis/member/auth";

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  isSignedUp: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
  completeSignup: () => set({ isSignedUp: true }),
  checkAuth: async () => {
    try {
      const profile = await getMyProfile();
      if (profile?.name) {
        set({ isLoggedIn: true });
        return true;
      } else {
        set({ isLoggedIn: false });
        return false;
      }
    } catch (e) {
      set({ isLoggedIn: false });
      return false;
    }
  },
}));

export default useAuthStore;
