import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "@/apis/member/auth";
import { getReviewCountOfMember } from "@/apis/member/getReviewCountOfMember";
import { getCheerCountOfMember } from "@/apis/member/getCheerCountOfMember";
import { getLikeCountOfMember } from "@/apis/member/getLikeCountOfMember";

export const useMyProfile = () => {
  return useQuery({
    queryKey: ["myProfile"],
    queryFn: getMyProfile,
    staleTime: 1000 * 60 * 5, // 5분
    retry: false,
    refetchOnMount: "always",
  });
};

export const useGetReviewCountOfMember = () => {
  return useQuery({
    queryKey: ["reviewCountOfMember"],
    queryFn: () => getReviewCountOfMember(),
  });
};

export const useGetCheerCountOfMember = () => {
  return useQuery({
    queryKey: ["cheerCountOfMember"],
    queryFn: () => getCheerCountOfMember(),
  });
};

export const useGetLikeCountOfMember = () => {
  return useQuery({
    queryKey: ["likeCountOfMember"],
    queryFn: () => getLikeCountOfMember(),
  });
};
