import api from "@/apis/instance/api";

export const getCompanyInfo = async (companyId) => {
  const res = await api.get("/company/public/preview", { companyId });

  return res.data;
};
