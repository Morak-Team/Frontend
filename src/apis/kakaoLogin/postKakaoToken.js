import api from "@apis/instance/api";

export const postKakaoToken = async (code) => {
  try {
    const res = await api.post(
      "/api/auth/kakao",
      { code },
      { withCredentials: true }, // JWT 쿠키 받기 위해 필요
    );
    return res.data;
  } catch (err) {
    console.error("카카오 토큰 요청 실패", err.response?.data || err.message);
    throw err;
  }
};
