// src/apis/kakaoLogin/postKakaoToken.js
import axios from "axios";

export const postKakaoToken = async (code) => {
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", import.meta.env.VITE_REST_API);
  params.append("redirect_uri", "http://localhost:5173/auth");
  params.append("code", code);

  const res = await axios.post("https://kauth.kakao.com/oauth/token", params);

  return res.data;
};
