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
  showOnlyLiked,
}) => {
  const mapInstance = useRef(null);
  const userMarkerRef = useRef(null);
  const markersRef = useRef({});
  const hasAnimatedRef = useRef(false);
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  const handleMarkerClick = useCallback(
    (place) => {
      Object.values(markersRef.current).forEach((marker) => {
        marker.setIcon(createMarkerIcon(false, false));
      });

      const clickedMarker = markersRef.current[place.id];
      if (clickedMarker) {
        createMarkerIcon(true, showOnlyLiked ? place.liked : false);
      }

      onMarkerClick?.(place);
    },
    [onMarkerClick, showOnlyLiked],
  );

  // 초기 지도 로딩
  useEffect(() => {
    if (isMapInitialized || (!userCoords && !center)) return;

    loadNaverMapScript().then(() => {
      const mapCenter = center
        ? new window.naver.maps.LatLng(center.lat, center.lng)
        : new window.naver.maps.LatLng(37.5665, 126.978);

      mapInstance.current = new window.naver.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom,
      });

      setIsMapInitialized(true);

      // 최초 마커 세팅
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
          icon: createMarkerIcon(
            isHighlighted,
            showOnlyLiked ? place.liked : false,
          ),
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
          icon: createMarkerIcon(true),
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
    showOnlyLiked,
  ]);

  // 최초 진입 시 애니메이션 이동 & 마커
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

  // 현위치 버튼 클릭 시 동작
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

  // 지도 초기화
  useEffect(() => {
    if (resetMap && mapInstance.current) {
      mapInstance.current.setCenter(
        new window.naver.maps.LatLng(37.5665, 126.978), // 서울 시청
      );
      mapInstance.current.setZoom(11.5);

      if (userMarkerRef.current) {
        userMarkerRef.current.setMap(null);
        userMarkerRef.current = null;
      }
    }
  }, [resetMap]);

  useEffect(() => {
    if (!mapInstance.current || !isMapInitialized) return;

    Object.values(markersRef.current).forEach((marker) => {
      marker.setMap(null);
    });
    markersRef.current = {};

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
        icon: createMarkerIcon(isHighlighted, place.liked),
      });

      markersRef.current[place.id] = marker;

      window.naver.maps.Event.addListener(marker, "click", () =>
        handleMarkerClick(place),
      );
    });
  }, [places, selectedPlace, isMapInitialized, handleMarkerClick]);
};

export default useMapViewer;
