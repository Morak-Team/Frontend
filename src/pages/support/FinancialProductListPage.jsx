import RecommendationCard from "@/pages/support/components/RecommendationCard";
import { useNavigate } from "react-router-dom";
import { useFinancialProducts } from "@/pages/support/hooks/useFinancialProducts";

const FinancialProductList = () => {
  const navigate = useNavigate();
  const { data: products, isLoading, error } = useFinancialProducts();

  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <div className="flex flex-col pr-5 pl-5 h-[calc(100vh-5.25rem)] overflow-y-auto pb-5 mb-5">
      <div className="mt-16 flex justify-between items-center">
        <p className="h3">소비한 가치에 맞는 금융상품</p>
        <img
          src="/svgs/support/company/xIcon.svg"
          className="w-8 h-8 cursor-pointer"
          alt="닫기"
          onClick={() => navigate(-1)}
        />
      </div>

      <div className="mt-10">
        <p className="b5 text-gray-9">총 {safeProducts.length}개</p>
      </div>

      {isLoading && <p className="mt-5">로딩 중...</p>}
      {error && <p className="mt-5">데이터를 불러오지 못했습니다.</p>}

      <div className="mt-3 flex flex-col gap-y-3">
        {safeProducts.map((item, idx) => (
          <RecommendationCard
            key={idx}
            productId={item.id}
            bank={item.bankName}
            title={item.productName}
            description={item.productDescription}
            showDescription={false}
            productType={item.productType}
            benefit={item.benefit}
          />
        ))}
      </div>
    </div>
  );
};

export default FinancialProductList;
