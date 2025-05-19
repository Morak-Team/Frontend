import { create } from "zustand";

const useUserInfoStore = create((set) => ({
  userInfo: {
    name: "",
    address: "",
    profileColor: "",
  },
  setUserInfo: (name, address, profileColor) =>
    set(() => ({
      userInfo: {
        name,
        address,
        profileColor,
      },
    })),
}));

export default useUserInfoStore;
