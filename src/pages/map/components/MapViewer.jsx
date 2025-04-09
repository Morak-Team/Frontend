import { useEffect, useRef } from "react";
import { loadNaverMapScript } from "@pages/map/utils/loadMapScript";

const MapViewer = ({ places, onMarkerClick }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    loadNaverMapScript()
      .then(() => {
        if (mapRef.current) {
          const map = new window.naver.maps.Map(mapRef.current, {
            center: new window.naver.maps.LatLng(37.5665, 126.978),
            zoom: 12,
          });

          places.forEach((place) => {
            const marker = new window.naver.maps.Marker({
              position: new window.naver.maps.LatLng(
                place.coords.lat,
                place.coords.lng
              ),
              map,
            });

            window.naver.maps.Event.addListener(marker, "click", () => {
              onMarkerClick(place);
            });
          });
        }
      })
      .catch((error) => {
        console.error("지도 로딩 중 오류 발생:", error);
      });
  }, [places, onMarkerClick]);

  return <div ref={mapRef} className="h-screen" />;
};

export default MapViewer;
