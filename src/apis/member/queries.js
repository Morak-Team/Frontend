import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "@/apis/member/auth";

export const useMyProfile = () => {
  return useQuery({
    queryKey: ["myProfile"],
    queryFn: getMyProfile,
    staleTime: 1000 * 60 * 5, // 5분
  });
};
