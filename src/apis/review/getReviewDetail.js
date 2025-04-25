import api from "@/apis/instance/api";

export const getTemperature = async (companyId) => {
  try {
    const res = await api.get("/reviews/get-temperature", {
      params: {
        companyId: companyId,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Temperature fetching error!", error);
  }
};

export const getReviewCount = async (companyId) => {
  try {
    const res = await api.get("/reviews/get-count-company-review", {
      params: {
        companyId: companyId,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Temperature fetching error!", error);
  }
};
