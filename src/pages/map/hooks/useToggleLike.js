import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import {
  likeCompany,
  unlikeCompany,
  getLikedCompanies,
} from "@apis/company/getLikedCompanies";

export const useToggleLike = ({
  placesWithDistance,
  setPlacesWithDistance,
  setFilteredPlaces,
  showOnlyLiked,
  selectedPlace,
  setSelectedPlace,
  onRequireLogin,
}) => {
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const toggleLike = async (targetId) => {
    const isAuthenticated = await useAuthStore.getState().checkAuth();

    if (!isAuthenticated) {
      onRequireLogin ? onRequireLogin() : navigate("/auth");
      return;
    }

    const currentPlace =
      placesWithDistance.find((p) => p.id === targetId) || selectedPlace;

    if (!currentPlace || isProcessing) return;

    setIsProcessing(true);
    setLoading(true);

    try {
      // 서버 liked 상태 확인
      const likedList = await getLikedCompanies();
      const isActuallyLiked = likedList.some(
        (c) => String(c.companyId) === String(targetId),
      );

      // 서버 상태 기준으로 실제 토글 실행
      if (isActuallyLiked) {
        await unlikeCompany(targetId);
      } else {
        await likeCompany(targetId);
      }

      // 최종 로컬 상태 반영
      const updated = placesWithDistance.map((p) =>
        p.id === targetId ? { ...p, liked: !isActuallyLiked } : p,
      );
      setPlacesWithDistance(updated);

      if (selectedPlace?.id === targetId) {
        setSelectedPlace({
          ...selectedPlace,
          liked: !isActuallyLiked,
          distance: currentPlace.distance,
          formattedDistance: currentPlace.formattedDistance,
        });
      }

      if (setFilteredPlaces) {
        setFilteredPlaces((prev) => {
          if (!prev) return [];
          return showOnlyLiked ? updated.filter((p) => p.liked) : updated;
        });
      }
    } catch (err) {
      console.error("찜 토글 실패:", err);
    } finally {
      setIsProcessing(false);
      setLoading(false);
    }
  };

  return { toggleLike, loading };
};
