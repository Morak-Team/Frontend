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
  });
};
