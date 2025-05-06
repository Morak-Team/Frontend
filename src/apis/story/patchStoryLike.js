import api from "@/apis/instance/api";

export const patchStoryLike = async (storyId) => {
  try {
    const res = await api.patch(`/story/likes/${storyId}`);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
