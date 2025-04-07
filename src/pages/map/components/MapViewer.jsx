import { useEffect, useRef } from "react";
import { loadNaverMapScript } from "@pages/map/utils/loadMapScript";

const MapViewer = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    loadNaverMapScript();

    const handleMapLoad = () => {
      if (window.naver && mapRef.current) {
        new window.naver.maps.Map(mapRef.current, {
          center: new window.naver.maps.LatLng(37.5665, 126.978), // 서울시청
          zoom: 12,
        });
      }
    };

    window.addEventListener("load", handleMapLoad);
    return () => {
      window.removeEventListener("load", handleMapLoad);
    };
  }, []);

  return <div ref={mapRef} className="h-screen" />;
};

export default MapViewer;
