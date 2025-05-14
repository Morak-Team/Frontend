import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postKakaoToken } from "@apis/kakaoLogin/postKakaoToken";
import useAuthStore from "@/store/authStore";

const KakaoAuth = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(null);
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const urlCode = new URL(window.location.href).searchParams.get("code");
    if (urlCode) setCode(urlCode);
  }, []);

  useEffect(() => {
    const loginWithKakao = async () => {
      if (!code) return;

      try {
        const { isNewUser } = await postKakaoToken(code); // 서버에서 쿠키에 토큰 설정 + isNewUser 응답
        login(); // 로그인 상태 전역 반영

        if (isNewUser) {
          navigate("/signup");
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error("카카오 로그인 실패", err);
        navigate("/auth");
      }
    };

    loginWithKakao();
  }, [code, login, navigate]);

  const handleLoginClick = () => {
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen pb-20 px-5 bg-white">
      {!code ? (
        <>
          <h1 className="h2 mt-20 self-start text-left">
            간편하게 로그인하고 <br />
            따뜻한 온기에 동참해보세요.
          </h1>

          <img
            src="/svgs/signUp/signUp.svg"
            className="w-full aspect-square rounded-2xl object-cover my-14"
            draggable={false}
          />

          <button
            onClick={handleLoginClick}
            className="w-full max-w-[30rem] flex gap-4 justify-center items-center bg-[#FEE500] h-12 mb-10 rounded-md"
          >
            <img src="/svgs/signUp/kakao.svg" className="w-6 h-6" />
            <p className="b1">카카오 아이디로 시작하기</p>
          </button>
        </>
      ) : (
        <div className="h3">카카오 로그인 처리 중입니다...</div>
      )}
    </div>
  );
};

export default KakaoAuth;
