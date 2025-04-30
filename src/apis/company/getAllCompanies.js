import api from "@apis/instance/api";

export const getAllCompanies = async () => {
  const response = await api.get("/company/public/all-companies");
  return response.data;
};
