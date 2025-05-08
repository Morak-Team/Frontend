import api from "@/apis/instance/api";

export const getLikeCountOfMember = async () => {
  const res = await api.get("/company/count-member-saves");
  return res.data;
};
