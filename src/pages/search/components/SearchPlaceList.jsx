import PlaceCard from "./PlaceCard";

const PlaceList = ({ places, onSelect, showEmptyMessage }) => {
  if (!places.length) {
    return showEmptyMessage ? (
      <div className="flex flex-col items-center justify-center mt-32 text-center h4 text-gray-9">
        <img
          src="/svgs/map/Ic_Illustration_Search.svg"
          alt="최근 검색 결과 없음"
          className="w-44 h-44"
        />
        <span>가까운 사회적 기업을</span>
        <span>찾아보세요</span>
      </div>
    ) : null;
  }

  return (
    <div className="bg-white">
      {places.map((place) => (
        <PlaceCard
          key={place.id}
          place={place}
          onClick={() => onSelect(place)}
        />
      ))}
    </div>
  );
};

export default PlaceList;
