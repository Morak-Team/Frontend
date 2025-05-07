import { useNavigate } from "react-router-dom";

const RecommendationCard = ({
  productId,
  bank,
  title,
  description,
  productType,
  benefit,
  showDescription = true,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/consumer/list/${productId}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-full h-full p-5 rounded-xl bg-white flex flex-col gap-2 cursor-pointer transition-shadow hover:shadow-sm"
      style={{
        boxShadow: "0px 2px 12px rgba(255, 111, 49, 0.05)",
      }}
    >
      <img
        src="/svgs/support/company/forwardIcon.svg"
        alt="상세보기"
        className="w-4 h-4 absolute top-5 right-5"
      />

      <div className="flex items-center gap-2">
        {productType && (
          <span className="text-caption2 font-medium text-secondary bg-secondaryBackground px-2 py-1 rounded">
            {productType}
          </span>
        )}
        
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-h4 text-gray-12 font-semibold">{title}</p>
        <p className="text-caption2 text-gray-9 font-medium">{bank}</p>
      </div>

      {showDescription && (
        <p className="text-b6 font-normal text-gray-11 mt-6 line-clamp-3">
          {description}
        </p>
      )}
    </div>
  );
};

export default RecommendationCard;
