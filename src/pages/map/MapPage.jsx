import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MapViewer from "@pages/map/components/MapViewer";
import PlaceBottomSheet from "./components/PlaceBottomSheet";
import CategoryBar from "./components/CategoryBar";
import IntroModal from "./components/IntroModal";
import HaveToLoginModal from "@components/common/HaveToLoginModal";
import { getDistanceFromLatLon } from "./utils/getDistanceFromLatLon";
import { formatDistance } from "./utils/formatDistance";
import { getAllCompanies } from "@apis/company/getAllCompanies";
import { getCompanyPreview } from "@apis/company/getCompanyPreview";
import { getLikedCompanies } from "@apis/company/getLikedCompanies";
import { useToggleLike } from "./hooks/useToggleLike";
import useAuthStore from "@/store/authStore";
import { getMyProfile } from "@apis/member/auth";

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
  const [isTrackingLocation, setIsTrackingLocation] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

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
    onRequireLogin: () => setShowLoginModal(true),
  });

  useEffect(() => {
    useAuthStore.getState().checkAuth(); // 전역 로그인 상태 초기화
  }, []);

  useEffect(() => {
    if (!sessionStorage.getItem("seenIntro")) {
      setShowIntroModal(true);
      sessionStorage.setItem("seenIntro", "true");
    }
  }, []);

  useEffect(() => {
    let watchId;

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        ({ coords }) => {
          setUserCoords({ lat: coords.latitude, lng: coords.longitude });
        },
        (err) => console.error("실시간 위치 추적 실패:", err),
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    if (!userCoords || !isTrackingLocation || !isMapReady) return;
    setMoveToCurrentLocation(true);
  }, [userCoords, isTrackingLocation, isMapReady]);

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
    setSelectedPlace(null);
    setShowOnlyLiked(false);

    if (englishCategory === "ALL") {
      setPlaces(originalPlaces);
      return;
    }

    const filtered = originalPlaces
      .filter((p) => p.companyCategory === englishCategory)
      .map((p) => ({ ...p, isSearchResult: true }));

    setPlaces(filtered);
  };

  const handleToggleLikedFilter = async () => {
    try {
      const profile = await getMyProfile();
      if (!profile?.name) throw new Error("Unauthenticated");

      const next = !showOnlyLiked;
      setShowOnlyLiked(next);
      setSelectedPlace(null);

      if (next) {
        const likedCompanies = await getLikedCompanies();
        const likedIds = likedCompanies.map((c) => c.companyId);
        const updated = originalPlaces.map((p) => ({
          ...p,
          liked: likedIds.includes(p.id),
        }));
        setPlaces(updated);
      } else {
        setPlaces(originalPlaces);
      }
    } catch (err) {
      console.error("로그인 확인 실패:", err);
      setShowLoginModal(true);
    }
  };
  const handleMarkerClick = async (place) => {
    try {
      const preview = await getCompanyPreview(place.id);

      let liked = false;
      const isAuthenticated = await useAuthStore.getState().checkAuth();
      if (isAuthenticated) {
        const likedList = await getLikedCompanies();
        liked = likedList.some((c) => c.companyId === place.id);
      }

      setSelectedPlace({ ...place, ...preview, liked });
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
        <span className="text-gray-6 b2">내 주변 가치가게 찾기</span>
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
                ? "/svgs/common/Ic_Heart_Fill.svg"
                : "/svgs/common/Ic_Heart-Empty.svg"
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

      {showLoginModal && (
        <HaveToLoginModal
          message="로그인이 필요한 기능입니다."
          subMessage="해당 기능은 로그인 후 이용할 수 있어요."
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </>
  );
};

export default MapPage;
