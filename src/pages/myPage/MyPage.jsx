import { useState, useEffect } from "react";
import { useGetCheerCountOfMember, useMyProfile } from "@/apis/member/queries";
import HaveToLoginModal from "@/components/common/HaveToLoginModal";
import { profileColorMap } from "@/constants/myPage/profileColorMap";
import { useGetReviewCountOfMember } from "@/apis/member/queries";
import { useGetLikeCountOfMember } from "@/apis/member/queries";
import api from "@/apis/instance/api";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";

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
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { data: reviewCount } = useGetReviewCountOfMember();
  const { data: cheerCount } = useGetCheerCountOfMember();
  const { data: likeCount } = useGetLikeCountOfMember();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { logout: setLoggedOut, isLogout } = useAuthStore();

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
      alert("로그아웃에 실패하였습니다.");
    }
  };
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>로딩 중…</p>
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
      {/* {showLoginModal && (
        <HaveToLoginModal
          message="로그인이 필요한 서비스입니다"
          subMessage=""
          showButton={true}
          showClose={false} // 닫기 아이콘 숨기기
          onClose={() => {}} // 내부 close는 더 이상 호출되지 않음
        />
      )} */}
      {/* 로그아웃 완료 모달 */}
      {showLogoutModal && <LogoutSuccessModal onClose={() => navigate("/")} />}
      {/* 카드 */}
      <div className="w-full bg-white rounded-2xl shadow-sm pt-20 pb-6 px-5 flex flex-col items-center relative z-10">
        {/* 수정 아이콘 */}
        <button className="absolute top-4 right-4 opacity-50">
          <img src="/svgs/myPage/edit.svg" alt="edit" className="w-6 h-6" />
        </button>
        {/* 닉네임 & 지역 */}
        <p className="h2">{nickname}</p>
        <p className="b4 text-gray-8 mt-1">{location}</p>

        {/* 구분선 */}
        <div className="w-full bg-gray-3 h-[0.1px] my-4" />

        {/* 찜/리뷰/응원 */}
        <div className="w-full flex justify-around text-center">
          {Object.entries(counts).map(([label, count]) => (
            <div key={label}>
              <p className="text-primary-8 font-bold text-lg">{count}</p>
              <p className="text-sm font-semibold">{label}</p>
            </div>
          ))}
        </div>
      </div>
      {/* 프로필 이미지 (카드 위로 걸치기) */}
      <div className="absolute top-21 z-20">
        <img
          src={profileColorMap[data?.profileColor] ?? profileColorMap.gray}
          alt="profile"
          className="w-24 h-24 rounded-full border-4 border-white shadow-md"
        />
      </div>
      {/* 로그아웃 버튼 (화면 하단 오른쪽) */}
      <div
        className="flex justify-end items-end w-full py-2 px-3"
        onClick={logout}
      >
        <button className="b4 text-gray-8 border rounded-md px-4 py-2 bg-white">
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;
