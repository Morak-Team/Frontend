import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MapViewer from "@pages/map/components/MapViewer";
import PlaceBottomSheet from "./components/PlaceBottomSheet";
import CategoryBar from "./components/CategoryBar";
import IntroModal from "./components/IntroModal";
import { getDistanceFromLatLon } from "./utils/getDistanceFromLatLon";
import { formatDistance } from "./utils/formatDistance";
import samplePlaces from "@constants/map/socialEnterprise";

const MapPage = () => {
  const [showIntroModal, setShowIntroModal] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [placesWithDistance, setPlacesWithDistance] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [showOnlyLiked, setShowOnlyLiked] = useState(false);

  const [userCoords, setUserCoords] = useState(null);
  const [moveToCurrentLocation, setMoveToCurrentLocation] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = () => navigate("/map/search");

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("seenIntro");
    if (!hasSeenIntro) {
      setShowIntroModal(true);
      sessionStorage.setItem("seenIntro", "true");
    }
  }, []);

  useEffect(() => {
    if (location.state?.resetMap) {
      setSelectedPlace(null);
      setFilteredPlaces(placesWithDistance);
      setMoveToCurrentLocation(false);
      navigate(location.pathname, { replace: true });
    }
  }, [location, placesWithDistance, navigate]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserCoords({ lat: latitude, lng: longitude });
        },
        (err) => console.error("위치 정보를 가져오는 데 실패했습니다:", err)
      );
    }
  }, []);

  useEffect(() => {
    if (userCoords) {
      const withDistance = samplePlaces.map((place) => {
        const distInMeters = getDistanceFromLatLon(
          userCoords.lat,
          userCoords.lng,
          place.coords.lat,
          place.coords.lng
        );
        return {
          ...place,
          distance: formatDistance(distInMeters),
        };
      });

      setPlacesWithDistance(withDistance);
      setFilteredPlaces(withDistance);
    }
  }, [userCoords]);

  const handleCategorySelect = (businessType) => {
    const filtered = placesWithDistance
      .filter((p) => p.businessType === businessType)
      .map((p) => ({ ...p, isSearchResult: true }));

    setFilteredPlaces(filtered);
    setSelectedPlace(null);
    setShowOnlyLiked(false);
  };

  const handleToggleLikedFilter = () => {
    const next = !showOnlyLiked;
    setShowOnlyLiked(next);
    setSelectedPlace(null);

    setFilteredPlaces(
      next ? placesWithDistance.filter((p) => p.liked) : placesWithDistance
    );
  };

  const handleToggleLike = (targetId) => {
    const updated = placesWithDistance.map((place) =>
      place.id === targetId ? { ...place, liked: !place.liked } : place
    );
    setPlacesWithDistance(updated);

    const updatedFiltered = showOnlyLiked
      ? updated.filter((p) => p.liked)
      : selectedPlace
        ? updated.filter((p) => p.businessType === selectedPlace.businessType)
        : updated;

    setFilteredPlaces(updatedFiltered);

    if (selectedPlace?.id === targetId) {
      const updatedSelected = updated.find((p) => p.id === targetId);
      setSelectedPlace(updatedSelected);
    }
  };

  return (
    <>
      <div
        onClick={handleSearchClick}
        className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[33.5rem] h-14 sm:h-16 px-4 sm:px-6 flex items-center justify-between bg-white rounded-2xl shadow cursor-pointer"
      >
        <span className="text-gray-400 text-sm sm:text-base">
          내 주변 가치가게 찾기
        </span>
        <img
          src="/svgs/map/Ic_Search.svg"
          alt="검색 아이콘"
          className="w-4 h-4 sm:w-5 sm:h-5"
        />
      </div>

      <CategoryBar onSelect={handleCategorySelect} />

      <div className="absolute top-48 sm:top-56 left-1/2 -translate-x-1/2 w-full max-w-[760px] z-40 px-4 flex justify-end">
        <button
          onClick={handleToggleLikedFilter}
          className={`w-10 h-10 rounded-full shadow flex items-center justify-center bg-white`}
        >
          <img
            src={
              showOnlyLiked
                ? "/svgs/Ic_Heart_Fill.svg"
                : "/svgs/Ic_Heart_Empty.svg"
            }
            alt="찜 필터"
            className="w-6 h-6"
          />
        </button>
      </div>

      {showIntroModal && (
        <IntroModal onClose={() => setShowIntroModal(false)} />
      )}

      <div
        className={`absolute ${
          selectedPlace || showIntroModal
            ? "bottom-80"
            : "bottom-28 sm:bottom-30"
        } left-1/2 -translate-x-1/2 w-full max-w-[760px] px-4 z-[10002] flex justify-end transition-all duration-300`}
      >
        <button
          onClick={() => setMoveToCurrentLocation(true)}
          className="w-10 h-10 p-2 bg-white rounded-full shadow flex items-center justify-center"
        >
          <img
            src="/svgs/map/Ic_Current_Location.svg"
            alt="사용자 현재 위치 버튼"
            className="w-6 h-6"
          />
        </button>
      </div>

      <MapViewer
        places={filteredPlaces}
        onMarkerClick={setSelectedPlace}
        userCoords={userCoords}
        moveToCurrentLocation={moveToCurrentLocation}
        onMoveComplete={() => setMoveToCurrentLocation(false)}
        resetMap={location.state?.resetMap}
        selectedPlace={selectedPlace}
        showOnlyLiked={showOnlyLiked}
      />

      {selectedPlace && (
        <PlaceBottomSheet
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
          onToggleLike={() => handleToggleLike(selectedPlace.id)}
        />
      )}
    </>
  );
};

export default MapPage;
