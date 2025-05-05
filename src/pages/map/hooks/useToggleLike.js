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
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const toggleLike = async (targetId) => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 기능입니다.");
      navigate("/auth");
      return;
    }

    const currentPlace = placesWithDistance.find((p) => p.id === targetId);
    if (!currentPlace) return;

    try {
      setLoading(true);

      if (currentPlace.liked) {
        await unlikeCompany(targetId);
      } else {
        try {
          await likeCompany(targetId);
        } catch (err) {
          if (err.response?.status === 409) {
            console.warn("이미 찜한 기업입니다.");
            return;
          }
          throw err;
        }
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
        if (showOnlyLiked) return updated.filter((p) => p.liked);
        return updated;
      });
    } catch (err) {
      if (err.response?.status === 401) {
        alert("로그인이 필요한 기능입니다.");
        navigate("/auth");
      } else {
        console.error("찜 토글 실패:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return { toggleLike, loading };
};
