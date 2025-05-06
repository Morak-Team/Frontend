import api from "@/apis/instance/api";

export const getBestStoryDetail = async (storyId) => {
  const res = await api.get(`/story/public/detail/${storyId}`);
  return res.data;
};
