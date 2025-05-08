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
      // 상세 페이지 캐시 업데이트
      queryClient.setQueryData(["bestStoryDetail", storyId], (old) => {
        if (!old) return old;
        return {
          ...old,
          storyLikes: old.storyLikes + 1,
        };
      });

      // 최근 스토리 목록 캐시 업데이트
      queryClient.setQueryData(["recentStory"], (old) => {
        if (!Array.isArray(old)) return old;
        return old.map((story) =>
          story.storyId === Number(storyId)
            ? { ...story, likes: (story.likes || 0) + 1 }
            : story,
        );
      });
    },
  });
};

import { getRecentStories } from "@/apis/story/getRecentStories";

export const useGetRecentStory = (size = 10) => {
  return useQuery({
    queryKey: ["recentStory"],
    queryFn: () => getRecentStories(size),
  });
};
