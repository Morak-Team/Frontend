import api from "@/apis/instance/api";

export const getReviews = async () => {
  const res = await api.get("/reviews/get-all-member-reviews");
  return res.data;
};

export const getCheers = async () => {
  const res = await api.get("/story/member-likes");
  return res.data;
};
