import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { likeCompany, unlikeCompany } from "@apis/company/getLikedCompanies";

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
  const navigate = useNavigate();

  const toggleLike = async (targetId) => {
    const isAuthenticated = await useAuthStore.getState().checkAuth();

    if (!isAuthenticated) {
      if (onRequireLogin) {
        onRequireLogin();
      } else {
        navigate("/auth");
      }
      return;
    }

    const currentPlace = placesWithDistance.find((p) => p.id === targetId);
    if (!currentPlace) return;

    try {
      setLoading(true);

      if (currentPlace.liked) {
        await unlikeCompany(targetId);
      } else {
        await likeCompany(targetId);
      }

      const updated = placesWithDistance.map((p) =>
        p.id === targetId ? { ...p, liked: !p.liked } : p,
      );
      setPlacesWithDistance(updated);

      if (selectedPlace?.id === targetId) {
        setSelectedPlace({
          ...selectedPlace,
          liked: !selectedPlace.liked,
          distance: currentPlace.distance,
          formattedDistance: currentPlace.formattedDistance,
        });
      }

      setFilteredPlaces((prev) => {
        if (!prev) return [];
        return showOnlyLiked ? updated.filter((p) => p.liked) : updated;
      });
    } catch (err) {
      console.error("찜 토글 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  return { toggleLike, loading };
};
