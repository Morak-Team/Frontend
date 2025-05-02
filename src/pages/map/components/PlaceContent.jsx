import {
  companyTypeIconMap,
  businessTypeNameMap,
  companyTypeNameMap,
} from "@constants/categoryMap";
import { formatDistance } from "../utils/formatDistance";

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

  return (
    <div className="flex flex-col gap-3 ">
      <div className="flex justify-between items-start px-5 sm:px-6">
        <div>
          <h3 className="text-xl font-bold break-words text-zinc-900">
            <div className="max-w-full text-xl font-bold text-zinc-900 leading-snug break-keep whitespace-normal mt-6">
              {companyName}
              <span className="ml-2 text-sm text-zinc-400 font-medium">
                {businessTypeNameMap[companyCategory] ?? companyCategory}
              </span>
            </div>
          </h3>

          <p className="text-sm flex items-center gap-2 mt-1">
            <span className="flex items-center text-orange-500 font-bold">
              <img
                src="/svgs/review/fireIcon.svg"
                alt="온도 아이콘"
                className="w-4 h-4 mr-1"
              />
              {temperature}도
            </span>
            <span className="text-zinc-500">방문자 리뷰 {reviewCount}</span>
          </p>
        </div>
      </div>

      {business && (
        <section className="px-5 sm:px-6">
          <div className="bg-blue-50 w-full px-4 py-3 rounded-lg text-sm font-medium whitespace-pre-line text-[#005C9E] leading-5">
            <p className="break-keep whitespace-pre-line">{business}</p>

            {companyType && (
              <div className="inline-flex mt-3 items-center gap-2 px-3 py-1 rounded-xl bg-white w-fit">
                <img
                  src={companyTypeIconMap[companyTypeNameMap[companyType]]}
                  alt={companyType}
                  className="w-5 h-5"
                />
                <span className="text-sm text-blue-500 font-medium">
                  {companyTypeNameMap[companyType]}
                </span>
              </div>
            )}
          </div>
        </section>
      )}
      <div className="flex items-center gap-2 px-5 sm:px-6">
        {showMapLink && (
          <a
            href={`https://map.naver.com/v5/search/${companyName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-4 px-14 gap-2 flex items-center justify-center rounded-md bg-[#FAFAF9] text-sm text-[#827F7A] font-semibold"
          >
            <img
              src="/svgs/map/Ic_NaverMap.svg"
              alt="네이버 지도 로고"
              className="w-6 h-6"
            />
            <span>네이버 지도에서 길찾기</span>
          </a>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation?.();
            onToggleLike?.(place.id);
          }}
          className="w-12 h-12 flex items-center justify-center rounded-md bg-[#FAFAF9]"
        >
          <img
            src={liked ? "/svgs/Ic_Heart_Fill.svg" : "/svgs/Ic_Heart_Empty.svg"}
            alt="좋아요 버튼"
            className="w-6 h-6"
          />
        </button>
      </div>
      <div className="w-full h-2 bg-[#F5F4F4] my-4 " />
      <div className="flex flex-col gap-3 px-5 sm:px-6">
        {companyLocation && (
          <div className="flex items-center gap-2 text-sm text-zinc-700 break-keep">
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
          <div className="flex items-center gap-2 text-sm text-zinc-700">
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
      <div className="w-full h-2 bg-[#F5F4F4] mt-4" />
    </div>
  );
};

export default PlaceContent;
