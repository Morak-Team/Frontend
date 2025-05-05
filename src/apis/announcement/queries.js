import { getAnnouncement } from "@/apis/announcement/getAnnouncement";
import { useQuery } from "@tanstack/react-query";

export const useGetAnnouncement = (size) => {
  return useQuery({
    queryKey: ["announcement"],
    queryFn: () => getAnnouncement(size),
  });
};
