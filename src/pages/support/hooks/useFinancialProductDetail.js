import { useQuery } from "@tanstack/react-query";
import api from "@apis/instance/api";

const fetchFinancialProductDetail = async (productId) => {
  try {
    const { data } = await api.get(
      `/support/public/consumer/detail/${productId}`,
    );
    return data;
  } catch (err) {
    console.error("금융상품 상세 정보 조회 실패: ", err);
    throw err;
  }
};

export const useGetFinancialProductDetail = (productId) => {
  return useQuery({
    queryKey: ["consumerProductDetail", productId],
    queryFn: () => fetchFinancialProductDetail(productId),
    enabled: !!productId,
  });
};
