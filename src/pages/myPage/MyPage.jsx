import { useState, useEffect } from "react";
import { useGetCheerCountOfMember, useMyProfile } from "@/apis/member/queries";
import HaveToLoginModal from "@/components/common/HaveToLoginModal";
import { profileColorMap } from "@/constants/myPage/profileColorMap";
import { useGetReviewCountOfMember } from "@/apis/member/queries";
import { useGetLikeCountOfMember } from "@/apis/member/queries";
import api from "@/apis/instance/api";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import ErrorIcon from "/public/svgs/modal/errorIcon.svg?react";
import ToastModal from "@/components/common/ToastModal";
import Spinner from "@/components/common/Spinner";
import useUserInfoStore from "@/store/userInfoStore";

const LogoutSuccessModal = ({ onClose }) => (
  <div className="fixed inset-0 z-[10001] flex justify-center items-center bg-black bg-opacity-30">
    <div className="bg-white rounded-xl shadow-xl w-[300px] py-8 px-6 flex flex-col items-center text-center">
      <p className="h4 text-gray-12 font-bold">로그아웃이 완료되었습니다!</p>
      <button
        onClick={onClose}
        className="mt-6 px-4 py-2 b5 bg-primary-8 text-white rounded-lg"
      >
        확인
      </button>
    </div>
  </div>
);

const MyPage = () => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useMyProfile();
  const { setUserInfo } = useUserInfoStore();

  useEffect(() => {
    if (data) {
      setUserInfo(data.name, data.address, data.profileColor);
    }
  }, [data]);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const { data: reviewCount } = useGetReviewCountOfMember();
  const { data: cheerCount } = useGetCheerCountOfMember();
  const { data: likeCount } = useGetLikeCountOfMember();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { logout: setLoggedOut, isLogout } = useAuthStore();

  const [toast, setToast] = useState({
    show: false,
    message: "",
    icon: null,
  });
  const fireToast = (message, icon = ErrorIcon, duration = 4000) => {
    setToast({ show: true, message, icon });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), duration);
  };

  const nickname = data?.name ?? "";
  const location = data?.address ?? "";
  const counts = {
    찜: likeCount ?? 0,
    리뷰: reviewCount?.length ?? 0,
    응원: cheerCount ?? 0,
  };

  useEffect(() => {
    if (error?.response?.status === 401 || isLogout) {
      setShowLoginModal(true);
    }
  }, [error, isLogout]);

  const logout = async () => {
    try {
      await api.post("/member/logout");
      setLoggedOut();
      setShowLogoutModal(true);
    } catch (e) {
      fireToast("로그아웃에 실패하였습니다.", ErrorIcon);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center flex-col">
        <Spinner />
      </div>
    );
  }

  if (showLoginModal) {
    return (
      <HaveToLoginModal
        message="로그인이 필요한 서비스입니다"
        subMessage=""
        showButton={true}
        showClose={false}
        onClose={() => {}}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-2 flex flex-col items-center pt-32 relative p-5">
      {showLogoutModal && <LogoutSuccessModal onClose={() => navigate("/")} />}

      <div className="w-full bg-white rounded-2xl shadow-sm pt-20 pb-6 px-5 flex flex-col items-center relative z-10">
        <button
          className="absolute top-4 right-4 opacity-50"
          onClick={() => navigate("/mypage/edit")}
        >
          <img src="/svgs/myPage/edit.svg" alt="edit" className="w-6 h-6" />
        </button>
        <p className="h2">{nickname}</p>
        <p className="b4 text-gray-8 mt-1">{location}</p>
        <div className="w-full bg-gray-3 h-[0.1px] my-4" />
        <div className="w-full flex justify-around text-center">
          {Object.entries(counts).map(([label, count]) => (
            <div
              key={label}
              onClick={() =>
                navigate("/mypage/detail", { state: { kind: label } })
              }
              className="cursor-pointer"
            >
              <p className="text-primary-8 font-bold text-lg">{count}</p>
              <p className="text-sm font-semibold">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-21 z-20">
        <img
          src={profileColorMap[data?.profileColor] ?? profileColorMap.gray}
          alt="profile"
          className="w-24 h-24 rounded-full border-4 border-white shadow-md"
        />
      </div>

      <div
        className="flex justify-end items-end w-full py-2 px-3"
        onClick={logout}
      >
        <button className="b4 text-gray-8 border rounded-md px-4 py-2 bg-white">
          로그아웃
        </button>
      </div>

      {toast.show && (
        <ToastModal
          message={toast.message}
          icon={toast.icon}
          duration={2000}
          onClose={() => setToast((t) => ({ ...t, show: false }))}
        />
      )}
    </div>
  );
};

export default MyPage;
