import { useEffect, useRef, useState } from "react";
import { getConsumptionDetail } from "@apis/consumer/getConsumptionDetail";
import { KOR_TO_ENUM_MAP } from "@pages/support/constants/consumerMap";
import Spinner from "@components/common/Spinner";

const CustomTooltip = ({ active, payload }) => {
  const [price, setPrice] = useState(null);
  const [count, setCount] = useState(null);
  const name = payload?.[0]?.name;
  const cacheRef = useRef({});

  useEffect(() => {
    let isMounted = true;

    const fetchTooltipData = async () => {
      if (!name) return;

      if (cacheRef.current[name]) {
        const cached = cacheRef.current[name];
        if (isMounted) {
          setPrice(cached.price);
          setCount(cached.count);
        }
        return;
      }

      const enumType = KOR_TO_ENUM_MAP[name.trim()];
      if (!enumType) return;

      try {
        const res = await getConsumptionDetail(enumType);
        const total = res?.consumption?.totalPrice || 0;
        const reviewCount = res?.reviewCount || 0;

        const formatted = `${total.toLocaleString()}원`;

        if (isMounted) {
          setPrice(formatted);
          setCount(reviewCount);
          cacheRef.current[name] = { price: formatted, count: reviewCount };
        }
      } catch (err) {
        console.error("툴팁 정보 조회 실패:", err);
      }
    };

    if (active) {
      setPrice(null);
      setCount(null);
      fetchTooltipData();
    }

    return () => {
      isMounted = false;
    };
  }, [active, name]);

  if (!active || !name) return null;

  return (
    <div className="bg-white px-3 py-2 border border-gray-300 rounded shadow text-sm text-gray-900 z-100 w-max">
      <p className="font-semibold">{name}</p>

      <p className="flex items-center gap-1">
        리뷰 수:
        {count !== null ? <span>{count}건</span> : <Spinner size={16} />}
      </p>

      <p className="flex items-center gap-1">
        소비금액:
        {price !== null ? <span>{price}</span> : <Spinner size={16} />}
      </p>
    </div>
  );
};

export default CustomTooltip;
