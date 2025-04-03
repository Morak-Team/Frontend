import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postKakaoToken } from "@/apis/kakaoLogin/postKakaoToken";
import { getKakaoData } from "@/apis/kakaoLogin/getKakaoData";

const KakaoAuth = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(null);

  useEffect(() => {
    const urlCode = new URL(window.location.href).searchParams.get("code");
    if (urlCode) setCode(urlCode);
  }, []);

  useEffect(() => {
    const loginWithKakao = async () => {
      if (!code) return;

      try {
        const tokenRes = await postKakaoToken(code);
        const accessToken = tokenRes.access_token;
        if (!accessToken) throw new Error("Access token 없음");

        const userRes = await getKakaoData(accessToken);
        const { id, properties } = userRes;

        const nickname = properties?.nickname || "비회원";
        const profileImage = properties?.profile_image || "";

        localStorage.setItem("userId", id);
        localStorage.setItem("userName", nickname);
        localStorage.setItem("profileImage", profileImage);
        document.cookie = `jwtToken=${accessToken}; path=/;`;

        navigate("/");
      } catch (err) {
        console.error("카카오 로그인 실패", err);
        navigate("/auth");
      }
    };

    loginWithKakao();
  }, [code, navigate]);

  const handleLoginClick = () => {
    const REST_API_KEY = import.meta.env.VITE_REST_API;
    const REDIRECT_URI = "http://localhost:5173/auth";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile_nickname,profile_image`;

    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      {!code && (
        <button onClick={handleLoginClick}>
          <img
            src="/images/kakao_login_button.png"
            alt="카카오 로그인 버튼"
            className="w-full"
          />
        </button>
      )}
      {code && <div className="text-lg">카카오 로그인 처리 중입니다...</div>}
    </div>
  );
};

export default KakaoAuth;
