import axios from "axios";

const kakaoInstance = axios.create({
  baseURL: "https://kapi.kakao.com",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  },
});

export default kakaoInstance;
