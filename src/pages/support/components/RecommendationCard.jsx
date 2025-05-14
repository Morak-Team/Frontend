import { useNavigate } from "react-router-dom";

const RecommendationCard = ({
  productId,
  bank,
  title,
  description,
  productType,
  recommendedCategory,
  defaultCategory,
  showDescription = true,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/consumer/list/${productId}`);
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`${title} 상품 정보`}
      className="relative w-full h-full py-5 px-6 bg-white flex flex-col gap-2 cursor-pointer transition-shadow shadow-shadow hover:shadow-md"
    >
      <img
        src="/svgs/support/company/forwardIcon.svg"
        alt="상세보기"
        className="w-4 h-4 absolute top-5 right-5"
      />

      <div className="flex items-center gap-2">
        {productType && recommendedCategory && defaultCategory && (
          <>
            <span className="caption2 text-gray-11 bg-gray-3 px-2 py-1 rounded-lg">
              {productType}
            </span>
            <span className="caption2 text-secondary bg-secondaryBackground px-2 py-1 rounded-lg">
              {recommendedCategory}
            </span>
            <span className="caption2 text-secondary bg-secondaryBackground px-2 py-1 rounded-lg">
              {defaultCategory}
            </span>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <p className="h4 text-gray-12">{title}</p>
        <p className="caption2 text-gray-9">{bank}</p>
      </div>

      {showDescription && (
        <p className="b6 text-gray-11 mt-6 line-clamp-3 break-keep">
          {description}
        </p>
      )}
    </div>
  );
};

export default RecommendationCard;
