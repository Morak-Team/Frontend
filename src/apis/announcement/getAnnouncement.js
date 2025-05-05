import api from "@/apis/instance/api";

export const getAnnouncement = async (size) => {
  try {
    const res = await api.get("/support/public/preview", { params: { size } });
    return res.data;
  } catch (e) {
    console.log("fetching error about announcement", e);
    throw e;
  }
};
