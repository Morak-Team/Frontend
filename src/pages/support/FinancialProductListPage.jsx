import { useEffect, useState } from "react";
import RecommendationCard from "@/pages/support/components/RecommendationCard";
import { useNavigate } from "react-router-dom";
import Spinner from "@components/common/Spinner";
import { useFinancialProducts } from "@/pages/support/hooks/useFinancialProducts";
import { getConsumptionDetail } from "@apis/consumer/getConsumptionDetail";
import { getMyProfile } from "@apis/member/auth";
import { KOR_TO_ENUM_MAP } from "@pages/support/constants/consumerMap";

const FinancialProductList = () => {
  const navigate = useNavigate();
  const { data: products, isLoading, error } = useFinancialProducts();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMyProfile();
        setUserName(res?.name || "사용자");
      } catch (e) {
        console.error("프로필 로딩 실패:", e);
      }
    };

    fetchProfile();
  }, []);

  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    const sortProductsByReviewCount = async () => {
      if (!products || products.length === 0) return;

      const uniqueCategories = new Set();
      products.forEach((item) => {
        if (item.recommendedCategory)
          uniqueCategories.add(item.recommendedCategory);
        if (item.defaultCategory) uniqueCategories.add(item.defaultCategory);
      });

      const reviewCountMap = new Map();

      await Promise.all(
        [...uniqueCategories].map(async (korName) => {
          const enumKey = KOR_TO_ENUM_MAP[korName];
          if (!enumKey) return;

          try {
            const res = await getConsumptionDetail(enumKey);
            reviewCountMap.set(korName, res?.reviewCount || 0);
          } catch {
            reviewCountMap.set(korName, 0);
          }
        })
      );

      const sorted = [...products].sort((a, b) => {
        const aCount =
          reviewCountMap.get(a.recommendedCategory) ||
          reviewCountMap.get(a.defaultCategory) ||
          0;
        const bCount =
          reviewCountMap.get(b.recommendedCategory) ||
          reviewCountMap.get(b.defaultCategory) ||
          0;
        return bCount - aCount;
      });

      setSortedProducts(sorted);
    };

    sortProductsByReviewCount();
  }, [products]);

  const safeProducts = Array.isArray(sortedProducts) ? sortedProducts : [];

  return (
    <div className="flex flex-col pr-5 pl-5 container overflow-y-auto pb-5 mb-5">
      <div className="mt-16 flex justify-between items-center">
        <p className="h3">소비한 가치에 맞는 금융상품</p>
        <img
          src="/svgs/support/company/xIcon.svg"
          className="w-8 h-8 cursor-pointer"
          alt="닫기"
          onClick={() => navigate(-1)}
        />
      </div>

      <div className="flex items-center justify-between mt-10">
        <p className="b5 text-gray-9">총 {safeProducts.length}개</p>
        <p className="caption2 text-primary-8 text-right">
          {userName}님이 리뷰를 남긴 기업 특성과
          <br /> 연관된 금융상품 순으로 보여드려요!
        </p>
      </div>

      {(isLoading || safeProducts.length === 0) && <Spinner />}
      {error && <p className="mt-5">데이터를 불러오지 못했습니다.</p>}

      <div className="mt-3 flex flex-col gap-y-3">
        {safeProducts.map((item) => (
          <RecommendationCard
            key={item.id}
            productId={item.id}
            bank={item.bankName}
            title={item.productName}
            description={item.productDescription}
            showDescription={false}
            productType={item.productType}
            benefit={item.benefit}
            recommendedCategory={item.recommendedCategory}
            defaultCategory={item.defaultCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default FinancialProductList;
