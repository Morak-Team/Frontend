import { useRef } from "react";
import useMapViewer from "../hooks/useMapViewer";

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
  disableAutoUserPan = false,
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
    disableAutoUserPan,
  });

  return <div ref={mapRef} className="h-screen" />;
};

export default MapViewer;
