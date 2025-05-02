import { useState } from "react";
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

  const toggleLike = async (targetId) => {
    const currentPlace = placesWithDistance.find((p) => p.id === targetId);
    const isLiked = currentPlace?.liked;

    try {
      setLoading(true);
      if (isLiked) {
        await unlikeCompany(targetId);
      } else {
        await likeCompany(targetId);
      }

      const updated = placesWithDistance.map((place) =>
        place.id === targetId ? { ...place, liked: !place.liked } : place,
      );
      setPlacesWithDistance(updated);

      const updatedFiltered = showOnlyLiked
        ? updated.filter((p) => p.liked)
        : selectedPlace
          ? updated.filter(
              (p) => p.companyCategory === selectedPlace.companyCategory,
            )
          : updated;
      setFilteredPlaces(updatedFiltered);

      if (selectedPlace?.id === targetId) {
        setSelectedPlace((prev) => ({
          ...prev,
          liked: !prev?.liked,
          distance: currentPlace?.distance,
          formattedDistance: currentPlace?.formattedDistance,
        }));
      }
    } catch (e) {
      console.error("찜 토글 실패:", e);
    } finally {
      setLoading(false);
    }
  };

  return { toggleLike, loading };
};
