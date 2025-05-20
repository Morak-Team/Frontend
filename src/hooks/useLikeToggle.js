import { useState, useEffect } from "react";
import {
  getLikedCompanies,
  likeCompany,
  unlikeCompany,
} from "@/apis/company/getLikedCompanies";
import useAuthStore from "@/store/authStore";
import useLikeStore from "@/store/useLikeStore";

export const useLikeToggle = (companyId) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { likedMap, setLike } = useLikeStore();

  // 로그인 및 좋아요 여부 확인
  useEffect(() => {
    const check = async () => {
      const authenticated = await useAuthStore.getState().checkAuth();
      setIsLoggedIn(authenticated);

      if (authenticated && companyId) {
        const likedList = await getLikedCompanies();
        const liked = likedList.some(
          (c) => String(c.companyId) === String(companyId),
        );
        setIsLiked(liked);
        setLike(companyId, liked);
      }
      setLoading(false);
    };

    if (companyId) check();
  }, [companyId]);

  // 좋아요 토글 함수
  const toggleLike = async () => {
    const authenticated = await useAuthStore.getState().checkAuth();
    setIsLoggedIn(authenticated);

    if (!authenticated) {
      setShowLoginModal(true);
      return;
    }

    try {
      const currentLiked = likedMap[companyId] ?? false;

      if (currentLiked) {
        await unlikeCompany(companyId);
      } else {
        await likeCompany(companyId);
      }
      const newLiked = !currentLiked;
      setIsLiked(newLiked);
      setLike(companyId, newLiked);
    } catch (e) {
      console.error("좋아요 토글 실패:", e);
    }
  };

  return {
    isLiked,
    isLoggedIn,
    loading,
    toggleLike,
    showLoginModal,
    setShowLoginModal,
  };
};
