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
  zoom,
  selectedPlace,
  showOnlyLiked,
}) => {
  const mapInstance = useRef(null);
  const userMarkerRef = useRef(null);
  const markersRef = useRef({});
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  const handleMarkerClick = useCallback(
    (place) => {
      Object.values(markersRef.current).forEach((marker) => {
        marker.setIcon(createMarkerIcon(false, false));
      });

      const clickedMarker = markersRef.current[place.id];
      if (clickedMarker) {
        clickedMarker.setIcon(
          createMarkerIcon(true, showOnlyLiked ? place.liked : false),
        );
      }

      onMarkerClick?.(place);
    },
    [onMarkerClick, showOnlyLiked],
  );

  useEffect(() => {
    if (isMapInitialized || !mapRef.current || !userCoords) return;

    loadNaverMapScript().then(() => {
      const userLatLng = new window.naver.maps.LatLng(
        userCoords.lat,
        userCoords.lng,
      );

      mapInstance.current = new window.naver.maps.Map(mapRef.current, {
        center: userLatLng,
        zoom: 17,
      });

      setIsMapInitialized(true);

      userMarkerRef.current = new window.naver.maps.Marker({
        position: userLatLng,
        map: mapInstance.current,
        icon: createUserMarkerIcon(),
      });

      // 마커 렌더링
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

  useEffect(() => {
    if (moveToCurrentLocation && userCoords && mapInstance.current) {
      const newCenter = new window.naver.maps.LatLng(
        userCoords.lat,
        userCoords.lng,
      );
      mapInstance.current.setCenter(newCenter);
      mapInstance.current.setZoom(17);

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

  useEffect(() => {
    if (!mapInstance.current || !isMapInitialized) return;

    const currentMarkerIds = new Set(Object.keys(markersRef.current));
    const newPlaceIds = new Set(places.map((p) => String(p.id)));

    currentMarkerIds.forEach((id) => {
      if (!newPlaceIds.has(id)) {
        markersRef.current[id].setMap(null);
        delete markersRef.current[id];
      }
    });

    places.forEach((place) => {
      const isHighlighted =
        place.isSearchResult ||
        (selectedPlace && selectedPlace.id === place.id);

      const marker = markersRef.current[place.id];

      if (!marker) {
        const newMarker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(
            place.coords.lat,
            place.coords.lng,
          ),
          map: mapInstance.current,
          icon: createMarkerIcon(isHighlighted, place.liked),
        });

        markersRef.current[place.id] = newMarker;

        window.naver.maps.Event.addListener(newMarker, "click", () =>
          handleMarkerClick(place),
        );
      } else {
        marker.setIcon(createMarkerIcon(isHighlighted, place.liked));
      }
    });
  }, [places, selectedPlace, isMapInitialized, handleMarkerClick]);
};

export default useMapViewer;
