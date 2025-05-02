import api from "@apis/instance/api";

export const getLikedCompanies = async () => {
  const res = await api.get("/company/member-saves");
  return res.data;
};

export const likeCompany = (companyId) =>
  api.patch(`/company/save/${companyId}`);

export const unlikeCompany = (companyId) =>
  api.patch(`/company/unsave/${companyId}`);
