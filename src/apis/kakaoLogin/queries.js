import { useQuery } from "@tanstack/react-query";
import { getKakaoData } from "./getKakaoData";

export const useKakaoUser = (accessToken) => {
  return useQuery(["kakaoUser"], () => getKakaoData(accessToken), {
    enabled: !!accessToken,
  });
};
