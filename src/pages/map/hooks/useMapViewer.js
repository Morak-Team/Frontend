import { useEffect, useRef, useCallback, useState } from "react";
import { loadNaverMapScript } from "@pages/map/utils/loadMapScript";
import { createMarkerIcon, createUserMarkerIcon } from "../utils/mapHelpers";

const useMapViewer = ({
  mapRef,
  places,
  onMarkerClick,
  userCoords,
  moveToCurrentLocation,
  onMoveComplete,
  resetMap,
  center,
  markerPosition,
  zoom = 11,
  selectedPlace,
}) => {
  const mapInstance = useRef(null);
  const userMarkerRef = useRef(null);
  const markersRef = useRef({});
  const hasAnimatedRef = useRef(false);
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  const handleMarkerClick = useCallback(
    (place) => {
      Object.values(markersRef.current).forEach((marker) => {
        marker.setIcon(createMarkerIcon(false));
      });

      const clickedMarker = markersRef.current[place.id];
      if (clickedMarker) {
        clickedMarker.setIcon(createMarkerIcon(true));
      }

      onMarkerClick?.(place);
    },
    [onMarkerClick],
  );

  useEffect(() => {
    if (!userCoords || isMapInitialized) return;

    loadNaverMapScript().then(() => {
      const mapCenter = center
        ? new window.naver.maps.LatLng(center.lat, center.lng)
        : new window.naver.maps.LatLng(37.5665, 126.978);

      mapInstance.current = new window.naver.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom,
      });

      setIsMapInitialized(true);

      places.forEach((place) => {
        if (!place.coords?.lat || !place.coords?.lng) return;

        const isHighlighted =
          place.isSearchResult ||
          (selectedPlace && selectedPlace.id === place.id);

        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(
            place.coords.lat,
            place.coords.lng,
          ),
          map: mapInstance.current,
          icon: createMarkerIcon(isHighlighted),
        });

        markersRef.current[place.id] = marker;

        window.naver.maps.Event.addListener(marker, "click", () =>
          handleMarkerClick(place),
        );
      });

      if (markerPosition) {
        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(
            markerPosition.lat,
            markerPosition.lng,
          ),
          map: mapInstance.current,
        });
      }
    });
  }, [
    userCoords,
    places,
    center,
    zoom,
    selectedPlace,
    markerPosition,
    handleMarkerClick,
    isMapInitialized,
    mapRef,
  ]);

  useEffect(() => {
    if (
      userCoords &&
      mapInstance.current &&
      !hasAnimatedRef.current &&
      isMapInitialized
    ) {
      const target = new window.naver.maps.LatLng(
        userCoords.lat,
        userCoords.lng,
      );
      mapInstance.current.panTo(target);
      hasAnimatedRef.current = true;

      const zoomTimeout = setTimeout(() => {
        mapInstance.current.setZoom(18, true);

        // 사용자 현위치 마커 생성 (처음 진입 시 확대되면 보여지도록)
        if (userMarkerRef.current) {
          userMarkerRef.current.setMap(null);
        }

        userMarkerRef.current = new window.naver.maps.Marker({
          position: target,
          map: mapInstance.current,
          icon: createUserMarkerIcon(),
        });
      }, 1800);

      return () => clearTimeout(zoomTimeout);
    }
  }, [userCoords, isMapInitialized]);

  useEffect(() => {
    if (moveToCurrentLocation && userCoords && mapInstance.current) {
      const newCenter = new window.naver.maps.LatLng(
        userCoords.lat,
        userCoords.lng,
      );
      mapInstance.current.setCenter(newCenter);
      mapInstance.current.setZoom(18);

      if (userMarkerRef.current) userMarkerRef.current.setMap(null);

      userMarkerRef.current = new window.naver.maps.Marker({
        position: newCenter,
        map: mapInstance.current,
        icon: createUserMarkerIcon(),
      });

      onMoveComplete?.();
    }
  }, [moveToCurrentLocation, userCoords, onMoveComplete]);

  useEffect(() => {
    if (resetMap && mapInstance.current) {
      mapInstance.current.setCenter(
        new window.naver.maps.LatLng(37.5665, 126.978),
      );
      mapInstance.current.setZoom(11.5);

      if (userMarkerRef.current) {
        userMarkerRef.current.setMap(null);
        userMarkerRef.current = null;
      }
    }
  }, [resetMap]);
};

export default useMapViewer;
