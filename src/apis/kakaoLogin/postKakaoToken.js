import axios from "axios";

/**
 * 카카오 인가 코드를 백엔드로 전달하여,
 * 백엔드에서 access_token → 사용자 인증 처리
 * 서버에서 카카오 토큰 발급 요청 (https://kauth.kakao.com/oauth/token)
 * @param {string} code - 카카오 로그인 redirect로 받은 인가 코드
 * @author 노찬영
 */
export const postKakaoToken = async (code) => {
  const res = await axios.post("/api/auth/kakao", { code });

  return res.data;
};
