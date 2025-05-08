import api from "@/apis/instance/api";

export const getCheerCountOfMember = async () => {
  const res = await api.get("/story/count-member-likes");
  return res.data;
};
