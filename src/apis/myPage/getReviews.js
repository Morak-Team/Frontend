import api from "@/apis/instance/api";

export const getReviews = async () => {
  const res = await api.get("/reviews/get-all-member-reviews");
  return res.data;
};
