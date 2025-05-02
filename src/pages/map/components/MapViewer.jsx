import { useRef } from "react";
import useMapViewer from "@pages/map/hooks/useMapViewer";

const MapViewer = ({
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
  const mapRef = useRef(null);

  useMapViewer({
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
  });

  return <div ref={mapRef} className="h-screen" />;
};

export default MapViewer;
