import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCompanyPreview } from "@apis/company/getCompanyPreview";
import { getAllCompanies } from "@apis/company/getAllCompanies";
import { getLikedCompanies } from "@apis/company/getLikedCompanies";
import useAuthStore from "@/store/authStore";
import { useToggleLike } from "@pages/map/hooks/useToggleLike";
import PlaceBottomSheet from "@pages/map/components/PlaceBottomSheet";
import MapViewer from "@/pages/search/components/MapViewer";

const MapCompanyPage = () => {
  const { companyId } = useParams();
  const [place, setPlace] = useState(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(true);
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);
  const [bottomSheetHeight, setBottomSheetHeight] = useState(220);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [preview, allCompanies] = await Promise.all([
          getCompanyPreview(companyId),
          getAllCompanies(),
        ]);

        const locationData = allCompanies.find(
          (c) => String(c.companyId) === String(companyId)
        );

        if (!locationData?.latitude || !locationData?.longitude) {
          console.warn("기업 좌표 정보가 누락되었습니다:", locationData);
          return;
        }

        const isAuthenticated = await useAuthStore.getState().checkAuth();
        const likedList = isAuthenticated ? await getLikedCompanies() : [];
        const liked = likedList.some((c) => c.companyId === Number(companyId));

        const enriched = {
          ...preview,
          coords: {
            lat: locationData.latitude,
            lng: locationData.longitude,
          },
          liked,
        };

        setPlace(enriched);
      } catch (err) {
        console.error("기업 정보 로딩 실패:", err);
      }
    };

    fetchData();
  }, [companyId]);

  const { toggleLike } = useToggleLike({
    placesWithDistance: place ? [place] : [],
    setPlacesWithDistance: () => {},
    setFilteredPlaces: () => {},
    selectedPlace: place,
    setSelectedPlace: setPlace,
    showOnlyLiked: false,
    onRequireLogin: () => {},
  });

  if (!place) return <p className="text-center mt-10">로딩 중...</p>;

  return (
    <div className="relative w-full h-screen">
      <MapViewer
        places={[place]}
        center={place.coords}
        markerPosition={place.coords}
        markerLabel={place.name}
        zoom={17}
        selectedPlace={place}
        onMarkerClick={() => setIsBottomSheetVisible(true)}
        moveToCurrentLocation={false}
        onMoveComplete={() => {}}
        userCoords={null}
        disableAutoUserPan={true}
      />
      {place && isBottomSheetVisible && (
        <PlaceBottomSheet
          place={place}
          onClose={() => setIsBottomSheetVisible(false)}
          onExpandChange={setIsBottomSheetExpanded}
          onToggleLike={toggleLike}
          onHeightChange={setBottomSheetHeight}
        />
      )}
    </div>
  );
};

export default MapCompanyPage;
