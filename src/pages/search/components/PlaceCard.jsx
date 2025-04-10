const PlaceCard = ({ place, onClick }) => {
  return (
    <div
      className="py-[1.4rem] px-[1.6rem] bg-white hover:bg-gray-50 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-base font-semibold text-zinc-900">
            {place.name}
          </h3>
          <p className="text-sm text-zinc-500 mt-1">{place.address}</p>
        </div>
        <span className="text-xs text-zinc-400">{place.distance}</span>
      </div>
    </div>
  );
};

export default PlaceCard;
