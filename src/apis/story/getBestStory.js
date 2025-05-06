import api from "@/apis/instance/api";

export const getBestStory = async () => {
  const res = await api.get("/story/public/best");
  return res.data;
};
