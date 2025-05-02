import api from "@/apis/instance/api";

export const getReviewCount = async (companyId) => {
  try {
    const res = await api.get("/reviews/public/get-count-company-review", {
      params: {
        companyId: companyId,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Temperature fetching error!", error);
  }
};
