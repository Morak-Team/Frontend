import { useNavigate } from "react-router-dom";
import ConsumptionChart from "./ConsumptionChart";
import RecommendationCard from "./RecommendationCard";
import Spinner from "@components/common/Spinner";
import { useConsumptionData } from "../hooks/useConsumptionData";
import { useFinancialProducts } from "../hooks/useFinancialProducts";
import { companyTypeNameMap } from "@constants/categoryMap";

const ConsumerTab = () => {
  const navigate = useNavigate();

  const { data: consumptionData, isLoading, error } = useConsumptionData();
  const {
    data: consumerProducts,
    isLoading: isProductsLoading,
    error: productsError,
  } = useFinancialProducts();

  if (isLoading || isProductsLoading) return <Spinner />;
  if (error || productsError) return <p>데이터를 불러오지 못했습니다.</p>;

  const transformedData = consumptionData.consumptions.map((item) => ({
    name: companyTypeNameMap[item.companyType] || item.companyType,
    value: item.totalPrice,
  }));

  const safeProducts = Array.isArray(consumerProducts) ? consumerProducts : [];

  return (
    <div className="flex flex-col gap-16 px-5">
      <div>
        <h1 className="text-h3 font-semibold mb-6">
          {consumptionData.name}님의 소비 가치
        </h1>
        <ConsumptionChart
          data={transformedData}
          reviewCount={consumptionData.reviewCount}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-h3 font-semibold">소비 가치에 맞는 금융상품</h2>
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => navigate("/consumer/list")}
          >
            <p className="b5 text-gray-9">전체 보기</p>
            <img src="/svgs/Ic_All.svg" className="w-3 h-3" alt="전체 보기" />
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {safeProducts.map((item, idx) => (
            <div key={idx} className="w-80 h-56 flex-shrink-0">
              <RecommendationCard
                key={idx}
                productId={item.id}
                bank={item.bankName}
                title={item.productName}
                description={item.productDescription}
                productType={item.productType}
                benefit={item.benefit}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsumerTab;
