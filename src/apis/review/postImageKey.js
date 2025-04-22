import api from "@/apis/instance/api";

export const postImageKey = async () => {
  const res = await api.post("/review/image-key");
  return res.data;
};
