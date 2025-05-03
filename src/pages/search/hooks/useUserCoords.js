import { useEffect, useState } from "react";

export const useUserCoords = () => {
  const [userCoords, setUserCoords] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.error("위치 정보를 가져올 수 없습니다:", err);
      },
    );
  }, []);

  return userCoords;
};
