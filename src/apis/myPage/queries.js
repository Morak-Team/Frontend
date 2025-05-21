import { useQuery } from "@tanstack/react-query";
import { getHearts, getReviews, getCheers } from "@/apis/myPage/getDetail";

export const useGetHearts = ({ enabled }) => {
  return useQuery({
    queryKey: ["userHearts"],
    queryFn: getHearts,
    enabled,
  });
};

export const useGetReviews = () => {
  return useQuery({ queryKey: ["userReview"], queryFn: () => getReviews() });
};

export const useGetCheers = () => {
  return useQuery({ queryKey: ["userCheers"], queryFn: () => getCheers() });
};
