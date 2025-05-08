import { useEffect, useRef, useState } from "react";
import { getConsumptionDetail } from "@apis/consumer/getConsumptionDetail";
import { KOR_TO_ENUM_MAP } from "@pages/support/constants/consumerMap";
import Spinner from "@components/common/Spinner";

const CustomTooltip = ({ active, payload }) => {
  const [price, setPrice] = useState(null);
  const [count, setCount] = useState(null);
  const name = payload?.[0]?.name;
  const priceCacheRef = useRef({});

  useEffect(() => {
    const fetchDetail = async () => {
      if (!name) return;

      if (priceCacheRef.current[name]) {
        setPrice(priceCacheRef.current[name].price);
        setCount(priceCacheRef.current[name].count);
        return;
      }

      const enumType = KOR_TO_ENUM_MAP[name.trim()];
      if (!enumType) return;

      try {
        const res = await getConsumptionDetail(enumType);
        const total = res?.consumption?.totalPrice || 0;
        const reviewCount = res?.reviewCount || 0;

        const formatted = `${total.toLocaleString()}원`;

        priceCacheRef.current[name] = {
          price: formatted,
          count: reviewCount,
        };

        setPrice(formatted);
        setCount(reviewCount);
      } catch (err) {
        console.error("툴팁 정보 조회 실패:", err);
      }
    };

    if (active) fetchDetail();
  }, [active, name]);

  if (!active || !name) return null;

  return (
    <div className="bg-white px-3 py-2 border border-gray-300 rounded shadow text-sm text-gray-900 z-100 w-max">
      <div className="font-semibold">{name}</div>
      <div className="flex items-center gap-1">
        리뷰 수:
        {count !== null ? (
          <span>{count}건</span>
        ) : (
          <span className="w-[16px] h-[16px]">
            <Spinner />
          </span>
        )}
      </div>
      <div className="flex items-center gap-1">
        소비금액:
        {price ? (
          <span>{price}</span>
        ) : (
          <span className="w-[16px] h-[16px]">
            <Spinner />
          </span>
        )}
      </div>
    </div>
  );
};

export default CustomTooltip;
