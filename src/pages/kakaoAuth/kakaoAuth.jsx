import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postKakaoToken } from "@apis/kakaoLogin/postKakaoToken";
import { getKakaoData } from "@apis/kakaoLogin/getKakaoData";

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
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-3xl font-semibold">
        간편하게 로그인하고 <br />
        따뜻한 온기에 동참해보세요.
      </h1>
      <img
        src="/images/img_illust.png"
        alt="모락_illust"
        className="w-[19.4rem] h-[19.4rem] rounded-[77px] object-cover my-20"
      />
      <button onClick={handleLoginClick} className="w-[30rem]">
        <img
          src="/images/kakao_login_large_wide.png"
          alt="카카오 로그인 버튼"
          className="w-full"
        />
      </button>
    </div>
  );
};

export default KakaoAuth;
