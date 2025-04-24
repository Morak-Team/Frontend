const PlaceContent = ({
  name,
  category,
  distance,
  address,
  images = [],
  liked,
  onToggleLike,
  isDetail = false,
  showMapLink = true,
}) => {
  return (
    <>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">
            {name}
            <span className="text-sm text-gray-500 font-medium ml-1">
              {category}
            </span>
          </h3>
          <p className="text-sm font-semibold text-gray-600 mt-1">
            {distance} · {address}
          </p>
          <p className="text-sm font-medium text-blue-500 mt-3">
            🧳 일자리제공
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation?.();
            onToggleLike();
          }}
          className={`w-10 h-10 p-2 rounded-full ${isDetail ? "bg-gray-200" : ""}`}
        >
          <img
            src={liked ? "/svgs/Ic_heart_fill.svg" : "/svgs/Ic_heart.svg"}
            alt="좋아요 버튼"
            className="w-6 h-6"
          />
        </button>
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

      <div className="flex w-64 h-12 rounded-2xl bg-gray-100 items-center justify-center mt-4">
        {showMapLink && (
          <a
            href={`https://map.naver.com/v5/search/${name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-900 text-sm no-underline"
          >
            네이버 지도에서 길찾기
          </a>
        )}
      </div>
    </>
  );
};

export default PlaceContent;
