import PlaceCard from "./PlaceCard";

const PlaceList = ({ places, onSelect, showEmptyMessage }) => {
  if (!places.length) {
    return showEmptyMessage ? (
      <div className="mt-16 text-center text-gray-400">
        검색 결과가 없습니다.
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
