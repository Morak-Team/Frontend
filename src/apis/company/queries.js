import { useQuery } from "@tanstack/react-query";
import { getCompanyPreview } from "@/apis/company/getCompanyPreview";

export const useGetCompanyPreview = (companyId) => {
  return useQuery({
    queryKey: ["companyPreview", companyId],
    queryFn: () => getCompanyPreview(companyId),
  });
};
