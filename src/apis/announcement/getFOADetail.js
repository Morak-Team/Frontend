import api from "@/apis/instance/api";

export const getFOADetail = async (id) => {
  const res = await api.get(`/support/public/detail/${id}`);
  return res.data;
};
