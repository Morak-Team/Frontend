import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import CompanyTab from "@/pages/support/components/CompanyTab";
import ConsumerTab from "@/pages/support/components/ConsumerTab";
import HaveToLoginModal from "@components/common/HaveToLoginModal";
import { getMyProfile } from "@apis/member/auth";

const SupportPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoggedIn, setIsLoggedIn] = useState(null); 
  const category = searchParams.get("category") || "consummer";
  const navigate = useNavigate();

  const handleTabChange = (value) => {
    setSearchParams({ category: value });
  };

  useEffect(() => {
    if (category === "consummer") {
      const checkLogin = async () => {
        try {
          await getMyProfile();
          setIsLoggedIn(true);
        } catch (e) {
          const status = e?.response?.status;
          const code = e?.response?.data?.code;
          if (status === 401 || code === "1002") {
            setIsLoggedIn(false);
          }
        }
      };
      checkLogin();
    }
  }, [category]);

  return (
    <div className="flex flex-col px-5 pt-24 h-[calc(100vh-5.25rem)] overflow-y-auto bg-gray-2">
      <div className="flex gap-2">
        <button
          onClick={() => handleTabChange("consummer")}
          className={`px-4 py-2 rounded-md b1 transition-all duration-300 ease-in-out ${
            category === "consummer"
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

        {category === "consummer" &&
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
