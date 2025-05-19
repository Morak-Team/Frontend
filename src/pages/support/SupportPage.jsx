import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CompanyTab from "@/pages/support/components/CompanyTab";
import ConsumerTab from "@/pages/support/components/ConsumerTab";
import { getMyProfile } from "@apis/member/auth";
import HaveToLoginModal from "./components/HaveToLoginModal";

const SupportPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const category = searchParams.get("category") || "consumer";

  const handleTabChange = (value) => {
    setSearchParams({ category: value });
  };

  useEffect(() => {
    if (category === "consumer") {
      const checkLogin = async () => {
        try {
          await getMyProfile();
          setIsLoggedIn(true);
        } catch (e) {
          const status = e?.response?.status;
          const code = e?.response?.data?.code;
          if (status === 401 || code === "1002") {
            setIsLoggedIn(false);
          } else {
            console.error("로그인 상태 확인 중 오류 발생:", e);
            setIsLoggedIn(false); // 오류 발생 시 기본적으로 로그인되지 않은 상태로 처리
          }
        }
      };
      checkLogin();
    }
  }, [category]);

  return (
    <div className="flex flex-col px-5 pt-24 pb-16 container overflow-y-auto bg-gray-2 scrollbar-hide">
      <div className="flex gap-2">
        <button
          onClick={() => handleTabChange("consumer")}
          className={`px-4 py-2 rounded-md b1 transition-all duration-300 ease-in-out ${
            category === "consumer"
              ? "shadow-surface text-gray-12 bg-white"
              : "text-gray-6 bg-transparent"
          }`}
        >
          소비자
        </button>

        <button
          onClick={() => handleTabChange("company")}
          className={`px-4 py-2 rounded-md b1 transition-all duration-300 ease-in-out ${
            category === "company"
              ? "shadow-surface text-gray-12 bg-white"
              : "text-gray-6 bg-transparent"
          }`}
        >
          사장님
        </button>
      </div>

      <div className="mt-7">
        {category === "company" && <CompanyTab />}

        {category === "consumer" &&
          (isLoggedIn === null ? null : isLoggedIn ? (
            <ConsumerTab />
          ) : (
            <HaveToLoginModal
              message="로그인이 필요한 기능입니다"
              subMessage="소비 가치 확인을 위해 로그인해주세요"
              showButton
              onClose={() => handleTabChange("company")}
            />
          ))}
      </div>
    </div>
  );
};

export default SupportPage;
