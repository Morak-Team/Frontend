import api from "@apis/instance/api";

export const getRecentStories = async (size) => {
  const res = await api.get("/story/public/all", {
    params: size ? { size } : {},
  });
  return res.data;
};
