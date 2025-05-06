import { getAnnouncement } from "@/apis/announcement/getAnnouncement";
import { useQuery } from "@tanstack/react-query";
import { getFOADetail } from "@/apis/announcement/getFOADetail";

export const useGetAnnouncement = (size) => {
  return useQuery({
    queryKey: ["announcement"],
    queryFn: () => getAnnouncement(size),
  });
};

export const useGetFOADetail = (id) => {
  return useQuery({
    queryKey: ["announcement", id],
    queryFn: () => getFOADetail(id),
  });
};
