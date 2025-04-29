import { useEffect, useRef, useCallback } from "react";
import { loadNaverMapScript } from "@pages/map/utils/loadMapScript";

const MapViewer = ({
  places,
  onMarkerClick,
  userCoords,
  moveToCurrentLocation,
  onMoveComplete,
  resetMap,
  center,
  markerPosition,
  zoom = 11.5,
  selectedPlace,
}) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const userMarkerRef = useRef(null);
  const markersRef = useRef({});

  const handleMarkerClick = useCallback(
    (place) => {
      Object.values(markersRef.current).forEach((marker) => {
        marker.setIcon({
          url: "/svgs/map/Ic_Marker_Orange.svg",
          size: new window.naver.maps.Size(48, 48),
          scaledSize: new window.naver.maps.Size(48, 48),
          anchor: new window.naver.maps.Point(24, 48),
        });
      });

      const clickedMarker = markersRef.current[place.id];
      if (clickedMarker) {
        clickedMarker.setIcon({
          url: "/svgs/map/Ic_Pin_Orange.svg",
          size: new window.naver.maps.Size(64, 64),
          scaledSize: new window.naver.maps.Size(64, 64),
          anchor: new window.naver.maps.Point(32, 64),
        });
      }

      onMarkerClick?.(place);
    },
    [onMarkerClick]
  );

  useEffect(() => {
    loadNaverMapScript()
      .then(() => {
        if (mapRef.current) {
          mapInstance.current = new window.naver.maps.Map(mapRef.current, {
            center: center
              ? new window.naver.maps.LatLng(center.lat, center.lng)
              : new window.naver.maps.LatLng(37.5665, 126.978),
            zoom,
          });

          if (places) {
            places.forEach((place) => {
              if (!place.coords?.lat || !place.coords?.lng) return;

              const isHighlighted =
                place.isSearchResult ||
                (selectedPlace && selectedPlace.id === place.id);

              const marker = new window.naver.maps.Marker({
                position: new window.naver.maps.LatLng(
                  place.coords.lat,
                  place.coords.lng
                ),
                map: mapInstance.current,
                icon: {
                  url: isHighlighted
                    ? "/svgs/map/Ic_Pin_Orange.svg"
                    : "/svgs/map/Ic_Marker_Orange.svg",
                  size: isHighlighted
                    ? new window.naver.maps.Size(64, 64)
                    : new window.naver.maps.Size(48, 48),
                  scaledSize: isHighlighted
                    ? new window.naver.maps.Size(64, 64)
                    : new window.naver.maps.Size(48, 48),
                  anchor: isHighlighted
                    ? new window.naver.maps.Point(32, 64)
                    : new window.naver.maps.Point(24, 48),
                },
              });

              markersRef.current[place.id] = marker;

              window.naver.maps.Event.addListener(marker, "click", () => {
                handleMarkerClick(place);
              });
            });
          }

          if (markerPosition) {
            new window.naver.maps.Marker({
              position: new window.naver.maps.LatLng(
                markerPosition.lat,
                markerPosition.lng
              ),
              map: mapInstance.current,
            });
          }
        }
      })
      .catch((error) => {
        console.error("지도 로딩 중 오류 발생:", error);
      });
  }, [center, markerPosition, places, zoom, handleMarkerClick, selectedPlace]);

  useEffect(() => {
    if (center && mapInstance.current) {
      const newCenter = new window.naver.maps.LatLng(center.lat, center.lng);
      mapInstance.current.setCenter(newCenter);
      mapInstance.current.setZoom(zoom);
    }
  }, [center, zoom]);

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
