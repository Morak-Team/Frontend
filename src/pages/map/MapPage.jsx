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

  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const handleSearchClick = () => navigate("/map/search");

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("seenIntro");
    if (!hasSeenIntro) {
      setShowIntroModal(true);
      sessionStorage.setItem("seenIntro", "true");
    }
  }, []);

  const { toggleLike: handleToggleLike } = useToggleLike({
    placesWithDistance: places,
    setPlacesWithDistance: setPlaces,
    setFilteredPlaces: () => {},
    showOnlyLiked,
    selectedPlace,
    setSelectedPlace,
  });

  useEffect(() => {
    if (location.state?.resetMap) {
      setSelectedPlace(null);
      setMoveToCurrentLocation(false);
      setPlaces(originalPlaces);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate, originalPlaces]);

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
    const fetchCompanies = async () => {
      try {
        const data = await getAllCompanies();
        const enriched = data.map((company) => ({
          ...company,
          id: company.companyId,
          name: company.companyName,
          coords: { lat: company.latitude, lng: company.longitude },
        }));
        setOriginalPlaces(enriched);
        setPlaces(enriched);
      } catch (error) {
        console.error("기업 데이터를 불러오는 데 실패했습니다:", error);
      }
    };

    fetchCompanies();
  }, []);

  const enrichedPlaces = useMemo(() => {
    return places.map((place) => {
      const dist = userCoords
        ? getDistanceFromLatLon(
            userCoords.lat,
            userCoords.lng,
            place.coords.lat,
            place.coords.lng
          )
        : 0;

      return {
        ...place,
        distance: dist,
        formattedDistance: formatDistance(dist),
      };
    });
  }, [places, userCoords]);

  const filteredPlaces = useMemo(() => {
    if (showOnlyLiked) {
      return enrichedPlaces.filter((p) => p.liked);
    }
    return enrichedPlaces;
  }, [enrichedPlaces, showOnlyLiked]);

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
        const likedCompanyIds = likedCompanies.map((c) => c.companyId);

        const updated = originalPlaces.map((p) => ({
          ...p,
          liked: likedCompanyIds.includes(p.id),
        }));

        setPlaces(updated);
      } catch (err) {
        console.error("찜한 기업 목록 조회 실패:", err);
      }
    } else {
      setPlaces(originalPlaces);
    }
  };

  const handleMarkerClick = async (place) => {
    try {
      const preview = await getCompanyPreview(place.id);
      setSelectedPlace({
        ...place,
        ...preview,
      });
    } catch (error) {
      console.error("프리뷰 조회 실패:", error);
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

      <MapViewer
        places={filteredPlaces}
        onMarkerClick={handleMarkerClick}
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
          onToggleLike={handleToggleLike}
          onExpandChange={setIsBottomSheetExpanded}
        />
      )}
    </>
  );
};

export default MapPage;
