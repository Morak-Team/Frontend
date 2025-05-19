import ReviewContent from "@/pages/map/components/review/ReviewContent";
import { useNavigate } from "react-router-dom";
import { useGetCompanyPreview } from "@/apis/company/queries";
import { businessTypeNameMap } from "@/constants/categoryMap";
import { useState, useEffect } from "react";
import {
  getLikedCompanies,
  likeCompany,
  unlikeCompany,
} from "@/apis/company/getLikedCompanies";
import useAuthStore from "@/store/authStore";
import useLikeStore from "@/store/useLikeStore";
import HaveToLoginModal from "@/components/common/HaveToLoginModal";
import useUserInfoStore from "@/store/userInfoStore";

const dummyReviewItem = {
  name: "김소영",
  profileColor: "pink",
  temperature: 74.6,
  reviewContent:
    "제품 품질도 후드러고 청건하게 잘 관리되어 있어요. 다시 방문하고 싶어요!",
  reviewCategories: ["GOOD_QUALITY", "CLEAN", "REVISIT"],
};

const ReviewItem = ({ data }) => {
  const navigate = useNavigate();
  const { data: companyData } = useGetCompanyPreview(data.companyId);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const { userInfo } = useUserInfoStore();

  const { likedMap, setLike } = useLikeStore();
  const isGloballyLiked = likedMap[data.companyId] ?? false;

  const combinedReviews = {
    ...data,
    name: userInfo.name,
    profileColor: userInfo.profileColor,
  };

  useEffect(() => {
    const checkLoginAndLiked = async () => {
      const isAuthenticated = await useAuthStore.getState().checkAuth();
      setIsLoggedIn(isAuthenticated);

      if (isAuthenticated && data?.companyId) {
        const likedList = await getLikedCompanies();
        const liked = likedList.some(
          (c) => String(c.companyId) === String(data.companyId)
        );
        setIsLiked(liked);
        setLike(data.companyId, liked);
      }
      setLoading(false);
    };

    if (data?.companyId) checkLoginAndLiked();
  }, [data?.companyId]);

  const handleLikeClick = async () => {
    const isAuthenticated = await useAuthStore.getState().checkAuth();
    setIsLoggedIn(isAuthenticated);

    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    try {
      setLoading(true);
      const currentLiked = likedMap[data.companyId] ?? false;

      if (currentLiked) {
        await unlikeCompany(data.companyId);
      } else {
        await likeCompany(data.companyId);
      }

      const newLiked = !currentLiked;
      setIsLiked(newLiked);
      setLike(data.companyId, newLiked);
    } catch (e) {
      console.error("좋아요 토글 실패:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col rounded-md pt-6 px-5 bg-white"
      onClick={() => navigate(`/review/${data.companyId}`)}
    >
      <div className="flex justify-between border-b-[2px] border-gray-3 pb-6">
        <div className="flex flex-col gap-2">
          <div className="flex gap-1 items-center">
            <p className="h4">{companyData?.companyName}</p>
            <p className="b5 text-gray-6">
              {businessTypeNameMap[companyData?.companyCategory ?? "기타"]}
            </p>
          </div>
          <p className="b6">{companyData?.companyLocation}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleLikeClick();
          }}
        >
          <img
            src={
              isLoggedIn && isGloballyLiked
                ? "/svgs/storeReview/fullHeartIcon.svg"
                : "/svgs/Ic_Heart-Empty.svg"
            }
            alt="좋아요 버튼"
            className="w-6 h-6"
          />
        </button>
      </div>

      <div>
        <ReviewContent item={combinedReviews} hasBorder={false} />
      </div>
    </div>
  );
};

export default ReviewItem;
