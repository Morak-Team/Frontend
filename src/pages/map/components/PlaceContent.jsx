import { categoryIconMap } from "@constants/iconMap";
import { formatDistance } from "../utils/formatDistance";

const PlaceContent = ({
  id,
  name,
  category,
  businessType,
  distance,
  formattedDistance,
  address,
  images = [],
  liked,
  onToggleLike,
  isDetail = false,
  showMapLink = true,
}) => {
  const categoryIcon = categoryIconMap[category];

  const displayedDistance =
    formattedDistance ||
    (typeof distance === "number" ? formatDistance(distance) : null);

  return (
    <>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">
            {name}
            <span className="text-sm text-gray-500 font-medium ml-1">
              {businessType}
            </span>
          </h3>
          <p className="text-sm font-semibold text-gray-600 mt-1">
            {displayedDistance ? `${displayedDistance} ∙ ${address}` : address}
          </p>

          {categoryIcon && (
            <div className="flex items-center gap-1 mt-3">
              <img src={categoryIcon} alt={category} className="w-5 h-5" />
              <p className="text-sm font-medium text-blue-500">{category}</p>
            </div>
          )}
        </div>
      </div>

      <div
        className={`flex space-x-2 mt-4 overflow-x-auto ${
          isDetail ? "px-0" : ""
        }`}
      >
        {images.slice(0, isDetail ? images.length : 2).map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`장소 이미지 ${idx + 1}`}
            className={isDetail ? "w-40 h-28" : "w-20 h-20"}
            style={{ objectFit: "cover", borderRadius: "12px" }}
          />
        ))}
      </div>

      <div className="flex items-center gap-2 mt-4">
        {showMapLink && (
          <a
            href={`https://map.naver.com/v5/search/${name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-72 py-3.5 px-14 flex items-center justify-center rounded-md bg-[#FAFAF9] text-sm text-zinc-900 font-medium"
          >
            네이버 지도에서 길찾기
          </a>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation?.();
            onToggleLike(id);
          }}
          className="w-14 p-2 flex items-center justify-center rounded-md bg-[#FAFAF9]"
        >
          <img
            src={liked ? "/svgs/Ic_Heart_Fill.svg" : "/svgs/Ic_Heart_Empty.svg"}
            alt="좋아요 버튼"
            className="w-full h-full"
          />
        </button>
      </div>
    </>
  );
};

export default PlaceContent;
