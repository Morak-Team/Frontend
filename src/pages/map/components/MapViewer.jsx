import { useEffect, useRef } from "react";
import { loadNaverMapScript } from "@pages/map/utils/loadMapScript";

const MapViewer = ({
  places,
  onMarkerClick,
  userCoords,
  moveToCurrentLocation,
  onMoveComplete,
  resetMap,
}) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const userMarkerRef = useRef(null);

  useEffect(() => {
    loadNaverMapScript()
      .then(() => {
        if (mapRef.current) {
          mapInstance.current = new window.naver.maps.Map(mapRef.current, {
            center: new window.naver.maps.LatLng(37.5665, 126.978),
            zoom: 11.5,
          });

          places.forEach((place) => {
            const iconUrl = place.isSearchResult
              ? "/svgs/map/Ic_Map_Search_Marker.svg"
              : "/svgs/map/Ic_Map_Marker.svg";

            const marker = new window.naver.maps.Marker({
              position: new window.naver.maps.LatLng(
                place.coords.lat,
                place.coords.lng
              ),
              map: mapInstance.current,
              icon: {
                url: iconUrl,
                size: new window.naver.maps.Size(32, 32),
                scaledSize: new window.naver.maps.Size(32, 32),
                anchor: new window.naver.maps.Point(16, 32),
              },
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

  useEffect(() => {
    if (resetMap && mapInstance.current) {
      mapInstance.current.setCenter(
        new window.naver.maps.LatLng(37.5665, 126.978)
      );
      mapInstance.current.setZoom(11.5);

      if (userMarkerRef.current) {
        userMarkerRef.current.setMap(null);
        userMarkerRef.current = null;
      }
    }
  }, [resetMap]);

  useEffect(() => {
    if (moveToCurrentLocation && userCoords && mapInstance.current) {
      const newCenter = new window.naver.maps.LatLng(
        userCoords.lat,
        userCoords.lng
      );
      mapInstance.current.setCenter(newCenter);
      mapInstance.current.setZoom(18.5);

      if (userMarkerRef.current) {
        userMarkerRef.current.setMap(null);
      }

      userMarkerRef.current = new window.naver.maps.Marker({
        position: newCenter,
        map: mapInstance.current,
        icon: {
          content:
            '<div style="width:20px;height:20px;background:#35ABFF;border-radius:9999px;filter:drop-shadow(0px 0px 12px rgba(53, 171, 255, 0.71))"></div>',
          anchor: new window.naver.maps.Point(10, 10),
        },
      });

      onMoveComplete?.();
    }
  }, [moveToCurrentLocation, userCoords, onMoveComplete]);

  return <div ref={mapRef} className="h-screen" />;
};

export default MapViewer;
