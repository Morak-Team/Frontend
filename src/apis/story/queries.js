import { getBestStory } from "@/apis/story/getBestStory";
import { getBestStoryDetail } from "@/apis/story/getBestStoryDetail";
import { useQuery } from "@tanstack/react-query";

export const useGetBestStory = () => {
  return useQuery({ queryKey: ["bestStory"], queryFn: () => getBestStory() });
};

export const useGetBestStoryDetail = (storyId) => {
  return useQuery({
    queryKey: ["bestStoryDetail", storyId],
    queryFn: () => getBestStoryDetail(storyId),
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchStoryLike } from "@/apis/story/patchStoryLike";

export const usePatchStoryLike = (storyId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => patchStoryLike(storyId),
    onSuccess: () => {
      queryClient.setQueryData(["bestStoryDetail", storyId], (old) => {
        if (!old) return old;
        return {
          ...old,
          storyLikes: old.storyLikes + 1,
        };
      });
    },
    onError: (error) => {
      if (error?.response?.status === 401) {
        alert("로그인이 필요합니다.");
      } else if (error?.response?.status === 400) {
        alert("이미 응원하신 스토리입니다.");
      } else {
        alert("응원 요청이 실패했습니다. 다시 시도해주세요.");
      }
    },
  });
};
