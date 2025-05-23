import { useState, useEffect, useMemo } from "react";
import SearchBar from "./components/SearchBar";
import RecentSearchList from "./components/RecentSearchList";
import PlaceList from "./components/SearchPlaceList";
import PlaceBottomSheet from "@pages/map/components/PlaceBottomSheet";
import { getDistanceFromLatLon } from "../map/utils/getDistanceFromLatLon";
import { formatDistance } from "../map/utils/formatDistance";
import { getCompanyPreview } from "@apis/company/getCompanyPreview";
import { useCompanyData } from "./hooks/useCompanyData";
import { useUserCoords } from "./hooks/useUserCoords";
import HaveToLoginModal from "@components/common/HaveToLoginModal";
import MapViewer from "./components/MapViewer";
import { useToggleLike } from "../map/hooks/useToggleLike";
import useAuthStore from "@/store/authStore";
import { getLikedCompanies } from "@/apis/company/getLikedCompanies";

const LOCAL_STORAGE_KEY = "recentSearches";

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [moveToCurrentLocation, setMoveToCurrentLocation] = useState(false);
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [bottomSheetHeight, setBottomSheetHeight] = useState(220);
  const [isDesktop, setIsDesktop] = useState(false);

  const { companies: allPlaces } = useCompanyData();
  const userCoords = useUserCoords();

  useEffect(() => {
    const updateSize = () => setIsDesktop(window.innerWidth >= 1024);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      setRecentSearches(parsed);
      setStep(parsed.length > 0 ? 2 : 1);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    if (keyword.trim() === "") {
      setIsSearched(false);
      setStep(recentSearches.length > 0 ? 2 : 1);
    }
  }, [keyword, recentSearches.length]);

  const filteredPlaces = useMemo(() => {
    if (!isSearched || !keyword.trim()) return [];
    const searchText = keyword.toLowerCase();

    return allPlaces
      .map((place) => {
        const match =
          place.name.toLowerCase().includes(searchText) ||
          place.category.toLowerCase().includes(searchText);

        if (!match) return null;

        const distance = userCoords
          ? getDistanceFromLatLon(
              userCoords.lat,
              userCoords.lng,
              place.coords.lat,
              place.coords.lng
            )
          : null;

        return {
          ...place,
          distance,
          formattedDistance:
            distance !== null ? formatDistance(distance) : null,
        };
      })
      .filter(Boolean)
      .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
  }, [allPlaces, keyword, isSearched, userCoords]);

  useEffect(() => {
    const handlePopState = () => {
      setStep((prev) => {
        if (prev === 5) {
          setSelectedPlace(null);
          setIsSearched(true);
        } else if (prev === 4) setIsSearched(false);
        else if (prev === 3) setKeyword("");
        return Math.max(1, prev - 1);
      });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleSearch = (text) => {
    if (!text.trim()) return;
    window.history.pushState({}, "");
    setKeyword(text);
    setIsSearched(true);
    setStep(4);
    setSelectedPlace(null);
    setIsBottomSheetVisible(false);
    setIsBottomSheetExpanded(false);

    const updated = [text, ...recentSearches.filter((w) => w !== text)];
    setRecentSearches(updated.slice(0, 5));
  };

  const handleSelectPlace = async (place) => {
    try {
      const preview = await getCompanyPreview(place.id);

      // 찜 여부 재확인
      let liked = false;
      const isAuthenticated = await useAuthStore.getState().checkAuth();
      if (isAuthenticated) {
        const likedList = await getLikedCompanies();
        liked = likedList.some((c) => c.companyId === place.id);
      }

      const enriched = {
        ...place,
        ...preview,
        liked,
      };
      setSelectedPlace(enriched);
      setIsBottomSheetVisible(true);
      setIsBottomSheetExpanded(false);
      setStep?.(5);
    } catch (err) {
      console.error("기업 상세 정보 불러오기 실패:", err);
    }
  };

  const handleFocusSearch = () => {
    if (step < 3) {
      window.history.pushState({}, "");
      setStep(3);
    }
  };

  const { toggleLike: handleToggleLike } = useToggleLike({
    placesWithDistance: selectedPlace ? [selectedPlace] : [],
    setPlacesWithDistance: () => {},
    setFilteredPlaces: () => {},
    showOnlyLiked: false,
    selectedPlace,
    setSelectedPlace,
    onRequireLogin: () => setShowLoginModal(true),
  });

  return (
    <div className="relative min-h-screen bg-white">
      {showLoginModal && (
        <HaveToLoginModal
          message="로그인이 필요한 기능입니다."
          subMessage="해당 기능은 로그인 후 이용할 수 있어요."
          onClose={() => setShowLoginModal(false)}
        />
      )}

      {step === 5 ? (
        <div className="absolute top-0 left-0 right-0 z-50 px-[1.6rem] pt-16 bg-transparent">
          <SearchBar
            keyword={keyword}
            setKeyword={setKeyword}
            onSearch={handleSearch}
            onFocus={handleFocusSearch}
            step={step}
          />
        </div>
      ) : (
        <div className="sticky top-0 z-50 bg-white">
          <div className="px-[1.6rem] pt-16 pb-8">
            <SearchBar
              keyword={keyword}
              setKeyword={setKeyword}
              onSearch={handleSearch}
              onFocus={handleFocusSearch}
              step={step}
            />
          </div>
          <div className="w-full h-2 bg-gray-3" />
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col items-center justify-center text-center h-full my-44 h4 text-gray-9">
          <img
            src="/svgs/map/Ic_Illustration_Search.svg"
            alt="검색기록 없음"
            className="w-24 h-24"
          />
          <p>
            가까운 사회적 기업을
            <br /> 찾아보세요
          </p>
        </div>
      )}
      {(step === 2 || step === 3) && (
        <RecentSearchList
          recentSearches={recentSearches}
          onSearch={handleSearch}
          setRecentSearches={setRecentSearches}
        />
      )}
      {step === 4 && !selectedPlace && (
        <PlaceList
          places={filteredPlaces}
          onSelect={handleSelectPlace}
          showEmptyMessage={true}
        />
      )}

      {step === 5 && (
        <div className="relative w-full h-screen">
          <MapViewer
            places={selectedPlace ? [selectedPlace] : []}
            center={selectedPlace?.coords}
            markerPosition={selectedPlace?.coords}
            markerLabel={selectedPlace?.name}
            zoom={17}
            selectedPlace={selectedPlace}
            onMarkerClick={() => setIsBottomSheetVisible(true)}
            moveToCurrentLocation={moveToCurrentLocation}
            onMoveComplete={() => setMoveToCurrentLocation(false)}
            userCoords={userCoords}
            disableAutoUserPan={true}
          />

          {!isBottomSheetExpanded && (
            <div
              className="absolute left-1/2 -translate-x-1/2 w-full max-w-[760px] px-4 z-[10003] flex justify-end transition-all duration-300"
              style={{
                bottom: !isBottomSheetVisible
                  ? isDesktop
                    ? "8rem"
                    : "6rem"
                  : `calc(${bottomSheetHeight}px + 6rem)`,
              }}
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

          {selectedPlace && isBottomSheetVisible && (
            <PlaceBottomSheet
              place={selectedPlace}
              onClose={() => setIsBottomSheetVisible(false)}
              onExpandChange={setIsBottomSheetExpanded}
              onToggleLike={handleToggleLike}
              onHeightChange={setBottomSheetHeight}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
