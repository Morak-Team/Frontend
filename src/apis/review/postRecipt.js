import api from "@/apis/instance/api";

export const postRecipt = async (formData) => {
  const res = await api.post("/naver/receipt", formData);
  return res.data;
};
