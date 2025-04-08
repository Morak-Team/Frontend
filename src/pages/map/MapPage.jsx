import { useState } from "react";
import MapViewer from "@pages/map/components/MapViewer";
import PlaceBottomSheet from "./components/PlaceBottomSheet";

const samplePlaces = [
  {
    id: 1,
    name: "사회적협동조합 강북나눔돌봄센터",
    category: "카페",
    distance: "541m",
    address: "방문자 리뷰 27",
    images: ["/images/sample1.jpeg", "/images/sample2.png"],
    liked: true,
    coords: { lat: 37.632615, lng: 127.015219 },
  },
];

const MapPage = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <>
      <MapViewer places={samplePlaces} onMarkerClick={setSelectedPlace} />
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
