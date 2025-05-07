import api from "../instance/api";

export const getConsumptionDetail = async (companyType) => {
  try {
    const res = await api.get("/member/consumption/detail", {
      params: { companyType },
    });
    return res.data;
  } catch (err) {
    console.error("소비 내역 조회 실패:", err.response?.data || err);
    throw err;
  }
};
