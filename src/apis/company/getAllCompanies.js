import api from "@apis/instance/api";

export const getAllCompanies = async () => {
  try {
    const response = await api.get("/company/public/all-companies");
    return response.data;
  } catch (error) {
    console.error("기업 데이터를 가져오는 중 오류 발생:", error);
    throw error;
  }
};
