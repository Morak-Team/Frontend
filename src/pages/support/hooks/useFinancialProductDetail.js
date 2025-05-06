import { useQuery } from "@tanstack/react-query";
import api from "@apis/instance/api";

const fetchFinancialProductDetail = async (productId) => {
  const { data } = await api.get(
    `/support/public/consumer/detail/${productId}`,
  );
  return data;
};

export const useGetFinancialProductDetail = (productId) => {
  return useQuery({
    queryKey: ["consumerProductDetail", productId],
    queryFn: () => fetchFinancialProductDetail(productId),
    enabled: !!productId,
  });
};
