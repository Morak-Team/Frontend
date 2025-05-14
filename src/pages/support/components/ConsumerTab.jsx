import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConsumptionChart from "./ConsumptionChart";
import RecommendationCard from "./RecommendationCard";
import Spinner from "@components/common/Spinner";
import { useConsumptionData } from "../hooks/useConsumptionData";
import { useFinancialProducts } from "../hooks/useFinancialProducts";
import { companyTypeNameMap } from "@constants/categoryMap";
import {
  ENUM_TO_KOR_MAP,
  RECOMMEND_MESSAGE_MAP,
} from "../constants/consumerMap";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "@/styles/swiper.css";

const ConsumerTab = () => {
  const [topCategory, setTopCategory] = useState(null);
  const navigate = useNavigate();

  const { data: consumptionData, isLoading, error } = useConsumptionData();
  const {
    data: consumerProducts,
    isLoading: isProductsLoading,
    error: productsError,
  } = useFinancialProducts();

  const safeProducts = Array.isArray(consumerProducts) ? consumerProducts : [];

  const filteredProducts = topCategory
    ? safeProducts.filter(
        (item) =>
          item.recommendedCategory === ENUM_TO_KOR_MAP[topCategory] ||
          item.defaultCategory === ENUM_TO_KOR_MAP[topCategory]
      )
    : safeProducts;

  if (isLoading || isProductsLoading) return <Spinner />;
  if (error || productsError) return <p>데이터를 불러오지 못했습니다.</p>;

  const transformedData =
    consumptionData.consumptions.map((item) => ({
      name: companyTypeNameMap[item.companyType] || item.companyType,
      value: item.totalPrice,
    })) || [];

  return (
    <div className="flex flex-col gap-14">
      <div>
        <h1 className="h3 mb-6">
          {consumptionData?.name || "모락 사용자"}님의 소비 가치
        </h1>
        <ConsumptionChart
          data={transformedData}
          reviewCount={consumptionData?.reviewCount || 0}
          onTopCategory={setTopCategory}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-5">
          <h2 className="h3">추천</h2>
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => navigate("/consumer/list")}
          >
            <p className="b5 text-gray-9">전체 보기</p>
            <img src="/svgs/Ic_All.svg" className="w-3 h-3" alt="전체 보기" />
          </div>
        </div>
        {topCategory && (
          <div
            className="mb-4 px-4 py-1.5 w-fit rounded-2xl flex items-center gap-2 shadow-[0px_2px_12px_rgba(46,45,43,0.05)]"
            style={{
              background:
                "linear-gradient(90deg, rgba(255, 111, 49, 0.20) 0%, rgba(255, 255, 255, 0.20) 100%), #FFF",
            }}
          >
            <img
              src="/svgs/support/consumer/Ic_SupportMessage.svg"
              alt="추천 금융상품 안내 아이콘"
              className="w-4 h-4"
            />
            <p className="b4 text-primary-8">
              {RECOMMEND_MESSAGE_MAP[ENUM_TO_KOR_MAP[topCategory]]}
            </p>
          </div>
        )}

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={12}
          slidesPerView={"auto"}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            el: ".custom-pagination",
            clickable: true,
            bulletClass: "custom-bullet",
            bulletActiveClass: "custom-bullet-active",
          }}
          className="w-full"
        >
          {filteredProducts.map((item) => (
            <SwiperSlide key={item.id} className="!w-[320px]">
              <div className="w-80 h-56 mr-3">
                <RecommendationCard
                  productId={item.id}
                  bank={item.bankName}
                  title={item.productName}
                  description={item.productDescription}
                  productType={item.productType}
                  benefit={item.benefit}
                  recommendedCategory={item.recommendedCategory}
                  defaultCategory={item.defaultCategory}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="custom-pagination flex justify-center gap-2 mt-4" />
      </div>
    </div>
  );
};

export default ConsumerTab;
