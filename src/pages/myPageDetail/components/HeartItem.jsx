import {
  companyTypeNameMap,
  companyTypeIconMap,
  businessTypeNameMap,
} from "@constants/categoryMap";
import HeartIcon from "/svgs/common/Ic_Heart_Fill.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unlikeCompany } from "@apis/company/getLikedCompanies";
import ToastModal from "@components/common/ToastModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserCoords } from "@pages/search/hooks/useUserCoords";
import { getDistanceFromLatLon } from "@pages/map/utils/getDistanceFromLatLon";

const HeartItem = ({ data }) => {
  const {
    companyId,
    companyName,
    companyCategory,
    companyType,
    companyLocation,
    business,
    latitude,
    longitude,
  } = data;

  const navigate = useNavigate();
  const userCoords = useUserCoords();
  console.log("userCoords", userCoords);

  const handleClick = () => {
    navigate(`/map/${companyId}`);
  };

  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (userCoords && latitude && longitude) {
      const d = getDistanceFromLatLon(
        userCoords.lat,
        userCoords.lng,
        latitude,
        longitude
      );
      setDistance(d);
    }
  }, [userCoords, latitude, longitude]);

  const formatDistance = (distanceInMeters) => {
    if (distanceInMeters < 1000) {
      return `${Math.round(distanceInMeters)}m`;
    }
    return `${(distanceInMeters / 1000).toFixed(1)}km`;
  };

  const queryClient = useQueryClient();
  const [toastVisible, setToastVisible] = useState(false);

  const { mutate: unlike, isLoading } = useMutation({
    mutationFn: () => unlikeCompany(companyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userHearts"] });
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2000);
    },
  });

  const handleUnlike = (e) => {
    e.stopPropagation();
    if (!isLoading) unlike();
  };

  return (
    <>
      <div
        className="bg-white rounded-xl p-5 flex flex-col gap-3 shadow-sm cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0 flex-1">
            <p className="h4 text-gray-12 truncate">
              {companyName}
              <span className="ml-1 b5 text-gray-6">
                {businessTypeNameMap[companyCategory] ?? companyCategory}
              </span>
            </p>

            {distance !== null && (
              <div className="flex items-center gap-1 mt-1 min-w-0 flex-nowrap">
                <p className="b4 text-gray-12 whitespace-nowrap">
                  {formatDistance(distance)}
                </p>
                <span className="b4 text-gray-6">·</span>
                <p className="b6 text-gray-12 w-full truncate">
                  {companyLocation}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleUnlike}
            aria-label="찜 버튼"
            className="flex-shrink-0 ml-2"
          >
            <img src={HeartIcon} alt="찜 아이콘" className="w-6 h-6" />
          </button>
        </div>

        {business && (
          <section>
            <div className="bg-secondaryBackground w-full px-4 py-3 rounded-lg b5 whitespace-pre-line text-secondaryText">
              <p className="break-keep whitespace-pre-line">{business}</p>

              {companyType && (
                <div className="inline-flex mt-3 items-center gap-2 px-3 py-1 rounded-xl bg-white w-fit">
                  <img
                    src={companyTypeIconMap[companyTypeNameMap[companyType]]}
                    alt={companyType}
                    className="w-5 h-5"
                  />
                  <span className="caption2 text-secondaryText">
                    {companyTypeNameMap[companyType]}
                  </span>
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      {toastVisible && (
        <ToastModal
          message="저장이 취소되었습니다"
          onClose={() => setToastVisible(false)}
        />
      )}
    </>
  );
};

export default HeartItem;
