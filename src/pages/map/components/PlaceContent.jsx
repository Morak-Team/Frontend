import {
  companyTypeIconMap,
  businessTypeNameMap,
  companyTypeNameMap,
} from "@constants/categoryMap";
import { formatDistance } from "../utils/formatDistance";
import {
  IcFire10,
  IcFire20,
  IcFire30,
  IcFire40,
  IcFire50,
  IcFire60,
  IcFire70,
  IcFire80,
  IcFire90,
  IcFire100,
} from "@assets/svgs/fire";

const PlaceContent = ({ place, onToggleLike, showMapLink = true }) => {
  const {
    id,
    companyName,
    companyCategory,
    companyType,
    business,
    reviewCount,
    temperature,
    distance,
    formattedDistance,
    companyLocation,
    companyTelNum,
    liked,
  } = place;

  const displayedDistance =
    formattedDistance ||
    (typeof distance === "number" ? formatDistance(distance) : null);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("복사되었습니다.");
    } catch (err) {
      console.error("복사 실패:", err);
    }
  };

  const fireIcons = {
    10: IcFire10,
    20: IcFire20,
    30: IcFire30,
    40: IcFire40,
    50: IcFire50,
    60: IcFire60,
    70: IcFire70,
    80: IcFire80,
    90: IcFire90,
    100: IcFire100,
  };

  const getFireIconByTemp = (temp) => {
    const normalized = Math.min(100, Math.max(10, Math.ceil(temp / 10) * 10));
    return fireIcons[normalized] || IcFire10;
  };

  const FireIcon = getFireIconByTemp(temperature);

  return (
    <div className="flex flex-col gap-3 ">
      <div className="flex justify-between items-start px-5 sm:px-6">
        <div>
          <h3 className="h3 break-words text-gray-12">
            <div className="max-w-full h3 text-gray-12 break-keep whitespace-normal mt-6">
              {companyName}
              <span className="ml-2 b5 text-gray-6">
                {businessTypeNameMap[companyCategory] ?? companyCategory}
              </span>
            </div>
          </h3>

          <p className="b4 flex items-center gap-2 mt-1">
            <span className="flex items-center text-primary-8 font-bold">
              <FireIcon className="w-4 h-4 mr-1" />
              {temperature}도
            </span>
            <span className="text-gray-12 b6">
              방문자 리뷰 {reviewCount}
            </span>
          </p>
        </div>
      </div>

      {business && (
        <section className="px-5 sm:px-6">
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
      <div className="flex flex-wrap sm:flex-nowrap gap-2 px-5 sm:px-6">
        {showMapLink && (
          <a
            href={`https://map.naver.com/v5/search/${companyName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[12rem] py-3 px-4 flex items-center justify-center gap-2 rounded-md bg-gray-2 text-b4 text-gray-9 font-semibold"
          >
            <img
              src="/svgs/map/Ic_NaverMap.svg"
              alt="네이버 지도 로고"
              className="w-5 h-5"
            />
            <span className="whitespace-nowrap">네이버 지도에서 길찾기</span>
          </a>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike?.(place.id);
          }}
          className="w-14 h-14 flex items-center justify-center rounded-md bg-gray-2"
        >
          <img
            src={liked ? "/svgs/Ic_Heart_Fill.svg" : "/svgs/Ic_Heart-Empty.svg"}
            alt="좋아요 버튼"
            className="w-6 h-6"
          />
        </button>
      </div>

      <div className="w-full h-2 bg-gray-3 my-4 " />
      <div className="flex flex-col gap-3 px-5 sm:px-6">
        {companyLocation && (
          <div className="flex items-center gap-2 b5 text-gray-11 break-keep">
            <img
              src="/svgs/map/Ic_Location.svg"
              alt="기업 주소"
              className="w-5 h-5"
            />
            {companyLocation}
            <button
              onClick={() => handleCopy(companyLocation)}
              aria-label="주소 복사"
            >
              <img
                src="/svgs/map/Ic_Copy.svg"
                alt="복사 버튼"
                className="w-4 h-4"
              />
            </button>
          </div>
        )}
        {companyTelNum && (
          <div className="flex items-center gap-2 b5 text-gray-11">
            <img
              src="/svgs/map/Ic_Location.svg"
              alt="기업 전화번호"
              className="w-5 h-5"
            />
            {companyTelNum}
            <button
              onClick={() => handleCopy(companyTelNum)}
              aria-label="전화번호 복사"
            >
              <img
                src="/svgs/map/Ic_Copy.svg"
                alt="복사 버튼"
                className="w-4 h-4"
              />
            </button>
          </div>
        )}
      </div>
      <div className="w-full h-2 bg-gray-3 mt-4" />
    </div>
  );
};

export default PlaceContent;
