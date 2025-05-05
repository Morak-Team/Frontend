import api from "@/apis/instance/api";

export const postRecipt = async (formData) => {
  // axios에 formData를 던지면, multipart/form-data; boundary=... 를 자동으로 붙여줍니다.
  const res = await api.post("/naver/receipt", formData);
  return res.data;
};
