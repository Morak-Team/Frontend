import api from "@apis/instance/api";

export const getCompanyPreview = async (companyId) => {
  try {
    const response = await api.get("/company/public/preview", {
      params: { companyId },
    });
    return response.data;
  } catch (error) {
    console.error("회사 미리보기 데이터를 가져오는 중 오류 발생:", error);
    throw error;
  }
};
