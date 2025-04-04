import axios from "axios";

export const kakaoInstance = axios.create({
  baseURL: "https://kapi.kakao.com",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  },
});
