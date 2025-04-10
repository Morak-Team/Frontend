import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MapViewer from "@pages/map/components/MapViewer";
import PlaceBottomSheet from "./components/PlaceBottomSheet";
import samplePlaces from "@constants/map/socialEnterprise";

const MapPage = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState(samplePlaces);

  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/map/search");
  };

  return (
    <>
      <div
        onClick={handleSearchClick}
        className="absolute top-24 left-1/2 -translate-x-1/2 z-50 w-[33.5rem] h-16 px-6 flex items-center justify-between bg-white rounded-2xl shadow cursor-pointer"
      >
        <span className="text-gray-400">내 주변 가치가게 찾기</span>
        <img src="/svgs/ic_Search.svg" alt="검색 아이콘" className="w-5 h-5" />
      </div>

      <MapViewer places={filteredPlaces} onMarkerClick={setSelectedPlace} />

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
