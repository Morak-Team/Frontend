import api from "@apis/instance/api";

export const getCompanyPreview = async (companyId) => {
  const response = await api.get("/company/public/preview", {
    params: { companyId },
  });
  return response.data;
};
