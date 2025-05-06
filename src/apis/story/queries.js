import { getBestStory } from "@/apis/story/getBestStory";
import { useQuery } from "@tanstack/react-query";

export const useGetBestStory = () => {
  return useQuery({ queryKey: ["bestStory"], queryFn: () => getBestStory() });
};
