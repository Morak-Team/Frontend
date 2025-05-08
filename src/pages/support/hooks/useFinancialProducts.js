import { useQuery } from "@tanstack/react-query";
import api from "@apis/instance/api";

const fetchFinancialProducts = async () => {
  const { data } = await api.get("/support/public/consumer/preview");
  return data;
};

export const useFinancialProducts = () => {
  return useQuery({
    queryKey: ["consumerProducts"],
    queryFn: fetchFinancialProducts,
  });
};
