import api from "@/apis/instance/api";

export const postRecipt = async (file) => {
  const form = new FormData();
  form.append("file", file);
  const res = await api.post("/reviews", form);

  return res.data;
};
