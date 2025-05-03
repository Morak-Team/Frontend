import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MapViewer from "@pages/map/components/MapViewer";
import PlaceBottomSheet from "./components/PlaceBottomSheet";
import CategoryBar from "./components/CategoryBar";
import IntroModal from "./components/IntroModal";
import { getDistanceFromLatLon } from "./utils/getDistanceFromLatLon";
import { formatDistance } from "./utils/formatDistance";
import { getAllCompanies } from "@apis/company/getAllCompanies";
import { getCompanyPreview } from "@apis/company/getCompanyPreview";
import { getLikedCompanies } from "@apis/company/getLikedCompanies";
import { useToggleLike } from "./hooks/useToggleLike";
import useAuthStore from "@/store/authStore";

const MapPage = () => {
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [originalPlaces, setOriginalPlaces] = useState([]);
  const [places, setPlaces] = useState([]);
  const [showOnlyLiked, setShowOnlyLiked] = useState(false);
  const [userCoords, setUserCoords] = useState(null);
  const [moveToCurrentLocation, setMoveToCurrentLocation] = useState(false);
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const { toggleLike: handleToggleLike } = useToggleLike({
    placesWithDistance: places,
    setPlacesWithDistance: setPlaces,
    setFilteredPlaces: () => {},
    showOnlyLiked,
    selectedPlace,
    setSelectedPlace,
  });

  useEffect(() => {
    if (!sessionStorage.getItem("seenIntro")) {
      setShowIntroModal(true);
      sessionStorage.setItem("seenIntro", "true");
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) =>
          setUserCoords({ lat: coords.latitude, lng: coords.longitude }),
        (err) => console.error("위치 정보 실패:", err)
      );
    }
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getAllCompanies();
        const enriched = data.map((c) => ({
          ...c,
          id: c.companyId,
          name: c.companyName,
          coords: { lat: c.latitude, lng: c.longitude },
        }));
        setOriginalPlaces(enriched);
        setPlaces(enriched);
      } catch (err) {
        console.error("기업 목록 불러오기 실패:", err);
      }
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (location.state?.resetMap) {
      setSelectedPlace(null);
      setMoveToCurrentLocation(false);
      setPlaces(originalPlaces);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate, originalPlaces]);

  const enrichedPlaces = useMemo(() => {
    return places.map((p) => {
      const dist = userCoords
        ? getDistanceFromLatLon(
            userCoords.lat,
            userCoords.lng,
            p.coords.lat,
            p.coords.lng
          )
        : 0;
      return { ...p, distance: dist, formattedDistance: formatDistance(dist) };
    });
  }, [places, userCoords]);

  const filteredPlaces = useMemo(() => {
    return showOnlyLiked
      ? enrichedPlaces.filter((p) => p.liked)
      : enrichedPlaces;
  }, [enrichedPlaces, showOnlyLiked]);

  const handleSearchClick = () => navigate("/map/search");

  const handleCategorySelect = (englishCategory) => {
    const filtered = originalPlaces
      .filter((p) => p.companyCategory === englishCategory)
      .map((p) => ({ ...p, isSearchResult: true }));

    setSelectedPlace(null);
    setShowOnlyLiked(false);
    setPlaces(filtered);
  };

  const handleToggleLikedFilter = async () => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 기능입니다.");
      navigate("/auth");
      return;
    }

    const next = !showOnlyLiked;
    setShowOnlyLiked(next);
    setSelectedPlace(null);

    if (next) {
      try {
        const likedCompanies = await getLikedCompanies();
        const likedIds = likedCompanies.map((c) => c.companyId);

        const updated = originalPlaces.map((p) => ({
          ...p,
          liked: likedIds.includes(p.id),
        }));

        setPlaces(updated);
      } catch (err) {
        console.error("찜 목록 불러오기 실패:", err);
      }
    } else {
      setPlaces(originalPlaces);
    }
  };

  const handleMarkerClick = async (place) => {
    try {
      const preview = await getCompanyPreview(place.id);
      setSelectedPlace({ ...place, ...preview });
    } catch (err) {
      console.error("프리뷰 불러오기 실패:", err);
    }
  };

  return (
    <>
      <div
        onClick={handleSearchClick}
        className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[33.5rem] h-14 sm:h-16 px-4 sm:px-6 flex items-center justify-between bg-white rounded-2xl shadow cursor-pointer"
      >
        <span className="text-gray-6 text-b2">내 주변 가치가게 찾기</span>
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
          className="w-10 h-10 rounded-full shadow bg-white flex items-center justify-center"
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

      {!isBottomSheetExpanded && (
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
      )}

      {userCoords && (
        <MapViewer
          places={filteredPlaces}
          onMarkerClick={handleMarkerClick}
          userCoords={userCoords}
          moveToCurrentLocation={moveToCurrentLocation}
          onMoveComplete={() => setMoveToCurrentLocation(false)}
          resetMap={location.state?.resetMap}
          selectedPlace={selectedPlace}
          showOnlyLiked={showOnlyLiked}
          onMapReady={() => setIsMapReady(true)}
        />
      )}

      {selectedPlace && (
        <PlaceBottomSheet
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
          onToggleLike={handleToggleLike}
          onExpandChange={setIsBottomSheetExpanded}
        />
      )}
    </>
  );
};

export default MapPage;
