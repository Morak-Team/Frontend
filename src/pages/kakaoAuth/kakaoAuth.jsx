import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postKakaoToken } from "@apis/kakaoLogin/postKakaoToken";

const KakaoAuth = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(null);

  // 인가 코드 추출
  useEffect(() => {
    const urlCode = new URL(window.location.href).searchParams.get("code");
    if (urlCode) setCode(urlCode);
  }, []);

  // 백엔드에 인가코드 전달 → 로그인 처리 요청
  useEffect(() => {
    const loginWithKakao = async () => {
      if (!code) return;

      try {
        await postKakaoToken(code); // 백엔드에서 JWT 쿠키 발급 처리
        navigate("/"); // 또는 navigate("/signup") ← 유저 상태에 따라
      } catch (err) {
        console.error("카카오 로그인 실패", err);
        navigate("/auth"); // 로그인 실패 시 다시 로그인 유도
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
    <div className="flex flex-col items-center justify-center min-h-screen pb-[8.4rem] px-4 bg-white">
      {!code && (
        <>
          <h1 className="text-4xl sm:text-3xl font-semibold leading-relaxed text-center">
            간편하게 로그인하고 <br />
            따뜻한 온기에 동참해보세요.
          </h1>

          <img
            src="/images/img_illust.png"
            alt="모락_illust"
            className="w-full max-w-[18rem] aspect-square rounded-[3rem] object-cover my-12"
            draggable={false}
          />

          <button onClick={handleLoginClick} className="w-full max-w-[30rem]">
            <img
              src="/images/kakao_login_large_wide.png"
              alt="카카오 로그인 버튼"
              className="w-full"
              draggable={false}
            />
          </button>
        </>
      )}
      {code && <div className="text-lg">카카오 로그인 처리 중입니다...</div>}
    </div>
  );
};

export default KakaoAuth;
