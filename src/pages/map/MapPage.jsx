import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MapViewer from "@pages/map/components/MapViewer";
import PlaceBottomSheet from "./components/PlaceBottomSheet";
import samplePlaces from "@constants/map/socialEnterprise";

const MapPage = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState(samplePlaces);
  const [userCoords, setUserCoords] = useState(null);
  const [moveToCurrentLocation, setMoveToCurrentLocation] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/map/search");
  };

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

  return (
    <>
      <div
        onClick={handleSearchClick}
        className="absolute top-24 left-1/2 -translate-x-1/2 z-50 w-[33.5rem] h-16 px-6 flex items-center justify-between bg-white rounded-2xl shadow cursor-pointer"
      >
        <span className="text-gray-400">내 주변 가치가게 찾기</span>
        <img src="/svgs/ic_Search.svg" alt="검색 아이콘" className="w-5 h-5" />
      </div>

      {/* 현위치 버튼 */}
      <button
        onClick={() => setMoveToCurrentLocation(true)}
        className="fixed bottom-40 right-8 z-50 w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center"
      >
        <img
          src="/svgs/ic_location.svg"
          alt="현재 위치 버튼"
        />
      </button>

      <MapViewer
        places={filteredPlaces}
        onMarkerClick={setSelectedPlace}
        userCoords={userCoords}
        moveToCurrentLocation={moveToCurrentLocation}
        onMoveComplete={() => setMoveToCurrentLocation(false)}
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
