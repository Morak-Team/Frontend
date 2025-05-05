import api from "@/apis/instance/api";

export const isLikedPlace = async (companyId) => {
  try {
    const res = await api.get("/company/member-saves");
    const likedList = res.data;

    return likedList.some((item) => item.companyId === companyId);
  } catch (error) {
    console.error("찜 여부 확인 실패:", error);
    return false;
  }
};
