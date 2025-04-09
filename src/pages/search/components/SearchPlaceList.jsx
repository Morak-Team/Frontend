import PlaceCard from "./PlaceCard";

const PlaceList = ({ places, onSelect }) => {
  if (!places.length) {
    return (
      <div className="mt-16 text-center text-gray-400">
        검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100 overflow-hidden">
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
