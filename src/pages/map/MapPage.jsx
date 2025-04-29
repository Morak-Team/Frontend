import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MapViewer from "@pages/map/components/MapViewer";
import PlaceBottomSheet from "./components/PlaceBottomSheet";
import samplePlaces from "@constants/map/socialEnterprise";
import CategoryBar from "./components/CategoryBar";
import { getDistanceFromLatLon } from "./utils/getDistanceFromLatLon";
import { formatDistance } from "./utils/formatDistance";
import IntroModal from "./components/IntroModal";

const MapPage = () => {
  const [showIntroModal, setShowIntroModal] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState(samplePlaces);
  const [userCoords, setUserCoords] = useState(null);
  const [moveToCurrentLocation, setMoveToCurrentLocation] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = () => {
    navigate("/map/search");
  };

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
      setFilteredPlaces(samplePlaces);
      setMoveToCurrentLocation(false);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserCoords({ lat: latitude, lng: longitude });
        },
        (err) => {
          console.error("위치 정보를 가져오는 데 실패했습니다:", err);
        }
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

      setFilteredPlaces(withDistance);
    }
  }, [userCoords]);

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

      <CategoryBar
        onSelect={(category) => {
          const filtered = samplePlaces
            .filter((p) => p.businessType === category)
            .map((p) => ({ ...p, isSearchResult: true }));

          setFilteredPlaces(filtered);
          setSelectedPlace(null);
        }}
      />

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
      />

      {selectedPlace && (
        <PlaceBottomSheet
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
        />
      )}
    </>
  );
};

export default MapPage;
