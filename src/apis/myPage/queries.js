import { useQuery } from "@tanstack/react-query";
import { getReviews } from "@/apis/myPage/getDetail";
import { getCheers } from "@/apis/myPage/getDetail";

export const useGetReviews = () => {
  return useQuery({ queryKey: ["userReview"], queryFn: () => getReviews() });
};

export const useGetCheers = () => {
  return useQuery({ queryKey: ["userCheers"], queryFn: () => getCheers() });
};
