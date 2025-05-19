import {
  businessTypeNameMap,
  companyTypeNameMap,
  companyTypeIconMap,
} from "@constants/categoryMap";
import { useState, useEffect } from "react";
import { usePaymentStore } from "@/store/paymentStore";
import {
  getLikedCompanies,
  likeCompany,
  unlikeCompany,
} from "@apis/company/getLikedCompanies";
import HaveToLoginModal from "@components/common/HaveToLoginModal";
import { openNaverMapRoute } from "@pages/map/utils/openNaverMapRoute";
import { useUserCoords } from "@pages/search/hooks/useUserCoords";
import useAuthStore from "@/store/authStore";

const PlaceInfo = ({ placeInfo }) => {
  const userCoords = useUserCoords();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const { companyId } = usePaymentStore();

  // 로그인 여부 + 찜 여부 확인
  useEffect(() => {
    const checkLoginAndLiked = async () => {
      const isAuthenticated = await useAuthStore.getState().checkAuth();
      setIsLoggedIn(isAuthenticated);

      if (isAuthenticated && companyId) {
        const likedList = await getLikedCompanies();
        const liked = likedList.some(
          (c) => String(c.companyId) === String(companyId)
        );
        setIsLiked(liked);
      }
      setLoading(false);
    };

    if (companyId) checkLoginAndLiked();
  }, [companyId]);

  const handleLikeClick = async () => {
    const isAuthenticated = await useAuthStore.getState().checkAuth();
    setIsLoggedIn(isAuthenticated);

    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    try {
      setLoading(true);
      if (isLiked) {
        await unlikeCompany(companyId);
      } else {
        await likeCompany(companyId);
      }
      setIsLiked((prev) => !prev);
    } catch (e) {
      console.error("좋아요 토글 실패:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleRouteClick = (e) => {
    e.preventDefault();

    if (userCoords) {
      openNaverMapRoute({
        slat: userCoords.lat,
        slng: userCoords.lng,
        sname: "사용자 위치",
        dlat: placeInfo.latitude,
        dlng: placeInfo.longitude,
        dname: placeInfo.companyName,
        appName: "com.example.yourapp",
      });
    } else {
      window.open(
        `https://map.naver.com/v5/search/${placeInfo.companyName}`,
        "_blank"
      );
    }
  };

  return (
    <div className="w-full px-5">
      <div className="flex justify-between items-start mt-4 w-full">
        <div className="w-full">
          <h3 className="h3">
            {placeInfo?.companyName}
            <span className="ml-2 b5 text-gray-6">
              {businessTypeNameMap[placeInfo.companyCategory] ??
                placeInfo?.companyCategory}
            </span>
          </h3>
          <div className="flex items-center justify-start mt-1">
            <img
              src="/svgs/storeReview/fireIcon.svg"
              className="w-4 h-4 mr-1"
            />
            <p className="b4 text-primary-8">
              {placeInfo?.temperature.toFixed(0)}도
            </p>
            <p className="b6 ml-2">방문자 리뷰 {placeInfo?.reviewCount}개</p>
          </div>

          <div className="bg-secondaryBackground flex flex-col b5 text-secondary3 rounded-xl px-4 py-3 mt-4 w-full leading-relaxed">
            {placeInfo?.business}

            {placeInfo?.companyType && (
              <div className="inline-flex mt-3 items-center gap-2 px-3 py-1 rounded-xl bg-white w-fit">
                <img
                  src={
                    companyTypeIconMap[
                      companyTypeNameMap[placeInfo?.companyType]
                    ]
                  }
                  className="w-4 h-4"
                />
                <span
                  className={`caption2 ${
                    placeInfo?.companyType === "PRE"
                      ? "text-pre"
                      : "text-secondary3"
                  }`}
                >
                  {companyTypeNameMap[placeInfo?.companyType]}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-6 w-full">
        <a
          href="#"
          onClick={handleRouteClick}
          className="flex-1 min-w-0 py-3 flex items-center justify-center gap-2 rounded-md bg-[#FAFAF9] text-sm text-zinc-900 font-medium overflow-hidden"
        >
          <img
            src="/svgs/storeReview/naverMapIcon.svg"
            className="w-6 h-6 shrink-0"
          />
          <span>네이버 지도에서 길찾기</span>
        </a>

        <button
          onClick={handleLikeClick}
          className="w-12 h-12 flex items-center justify-center rounded-md bg-[#FAFAF9] shrink-0"
        >
          <img
            src={
              isLoggedIn && isLiked
                ? "/svgs/storeReview/fullHeartIcon.svg"
                : "/svgs/Ic_Heart-Empty.svg"
            }
            alt="좋아요 버튼"
            className="w-6 h-6"
          />
        </button>
      </div>

      {showLoginModal && (
        <HaveToLoginModal
          message="로그인이 필요한 기능입니다"
          subMessage=""
          showButton={true}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
};

export default PlaceInfo;
