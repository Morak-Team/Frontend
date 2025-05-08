import { useQuery } from "@tanstack/react-query";
import api from "@apis/instance/api";

export const useConsumptionData = () => {
  return useQuery({
    queryKey: ["consumption"],
    queryFn: async () => {
      const res = await api.get("/member/consumption");
      return res.data;
    },
  });
};
