import { getReviews } from "@/apis/myPage/getReviews";
import { useQuery } from "@tanstack/react-query";

export const useGetReviews = () => {
  return useQuery({ queryKey: ["userReview"], queryFn: () => getReviews() });
};
