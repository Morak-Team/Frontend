const RecommendationCard = ({ bank, title, description }) => {
  return (
    <div
      className="relative w-80 h-56 p-5 rounded-xl bg-white flex flex-col gap-2 justify-evenly"
      style={{
        boxShadow: "0px 2px 12px rgba(255, 111, 49, 0.05)",
      }}
    >
      <img
        src="/svgs/support/company/forwardIcon.svg"
        alt="상세보기"
        className="absolute top-5 right-5 w-4 h-4 cursor-pointer"
      />

      <div className="flex flex-col gap-1">
        <p className="text-caption2 text-gray-9 font-medium">{bank}</p>
        <p className="text-h4 text-gray-12 font-semibold leading-snug">
          {title}
        </p>
      </div>

      <p className="text-b6 font-normal text-gray-11 mt-2 leading-relaxed line-clamp-3">
        {description}
      </p>
    </div>
  );
};

export default RecommendationCard;
