import { kakaoInstance } from "./api";

export const getKakaoData = async (accessToken) => {
  const res = await kakaoInstance.get("/v2/user/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data; 
};
