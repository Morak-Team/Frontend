import axios from "axios";
import react from "@vitejs/plugin-react-swc";

export const kakaoInstance = axios.create({
  baseURL: "https://kapi.kakao.com",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  },
});
