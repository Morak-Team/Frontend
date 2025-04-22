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
            center: new window.naver.maps.LatLng(37.5665, 126.978), // 중심: 서울 시청
            zoom: 12,
          });

          places.forEach((place) => {
            const marker = new window.naver.maps.Marker({
              position: new window.naver.maps.LatLng(
                place.coords.lat,
                place.coords.lng
              ),
              map: mapInstance.current,
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

  // 지도를 현재 위치로 이동
  useEffect(() => {
    if (resetMap && mapInstance.current) {
      mapInstance.current.setCenter(
        new window.naver.maps.LatLng(37.5665, 126.978)
      );
      mapInstance.current.setZoom(12);

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
      mapInstance.current.setZoom(20);

      if (userMarkerRef.current) {
        userMarkerRef.current.setMap(null);
      }

      // 사용자 현재 위치 마커 생성
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
