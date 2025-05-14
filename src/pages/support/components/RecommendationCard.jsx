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
      aria-label={`${title} 상품 상세정보`}
      className="relative w-full h-full p-5 rounded-xl bg-white flex flex-col gap-2 cursor-pointer transition-shadow shadow-shadow hover:shadow-md"
    >
      <img
        src="/svgs/support/company/forwardIcon.svg"
        alt="상세보기"
        className="w-4 h-4 absolute top-5 right-5"
      />

      <div className="flex items-center gap-2">
        {productType && recommendedCategory && defaultCategory && (
          <>
            <span className="text-caption2 font-medium text-gray-11 bg-gray-3 px-2 py-1 rounded">
              {productType}
            </span>
            <span className="text-caption2 font-medium text-secondary bg-secondaryBackground px-2 py-1 rounded">
              {recommendedCategory}
            </span>
            <span className="text-caption2 font-medium text-secondary bg-secondaryBackground px-2 py-1 rounded">
              {defaultCategory}
            </span>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-h4 text-gray-12 font-semibold">{title}</p>
        <p className="text-caption2 text-gray-9 font-medium">{bank}</p>
      </div>

      {showDescription && (
        <p className="text-b6 font-normal text-gray-11 mt-6 line-clamp-3 break-keep">
          {description}
        </p>
      )}
    </div>
  );
};

export default RecommendationCard;
