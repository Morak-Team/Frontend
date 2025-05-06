import api from "@/apis/instance/api";

export const getMyProfile = async () => {
  const res = await api.get("/member/auth/me");
  return res.data;
};
