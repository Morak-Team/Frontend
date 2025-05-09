import {
  companyTypeIconMap,
  businessTypeIconMap,
} from "@constants/categoryMap";

const PlaceCard = ({ place, onClick }) => {
  const categoryIcon = companyTypeIconMap[place.category];
  const businessIcon = businessTypeIconMap[place.businessType];

  return (
    <div
      onClick={onClick}
      className="flex justify-between items-start bg-white px-[1.9rem] py-5 border-b border-black hover:bg-gray-50 cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <img
          src="/svgs/map/Ic_Location.svg"
          alt="위치 아이콘"
          className="w-6 h-6 mt-1"
        />
        <div className="flex flex-col">
          <h3 className="text-b2 font-semibold text-gray-12">
            {place.name}
          </h3>
          <p className="text-b6 text-gray-9 mt-1">{place.address}</p>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <div className="flex gap-1 mb-1">
          {categoryIcon && (
            <img
              src={categoryIcon}
              alt={place.category}
              className="w-6 h-6 rounded bg-gray-2 p-1"
            />
          )}
          {businessIcon && (
            <img
              src={businessIcon}
              alt={place.businessType}
              className="w-6 h-6 rounded bg-gray-2 p-1"
            />
          )}
        </div>
        <span className="text-b6 text-gray-11">{place.formattedDistance}</span>
      </div>
    </div>
  );
};

export default PlaceCard;
