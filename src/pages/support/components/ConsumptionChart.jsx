import { useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import {
  COLOR_MAP,
  SPEECH_BUBBLE_MAP,
  KOR_TO_ENUM_MAP,
  ENUM_TO_KOR_MAP,
} from "@pages/support/constants/consumerMap";
import { getConsumptionDetail } from "@apis/consumer/getConsumptionDetail";
import CustomTooltip from "./CustomTooltip";

const ConsumptionChart = ({ data, reviewCount, onTopCategory }) => {
  const [topReviewSpeech, setTopReviewSpeech] = useState("");
  const [topTwo, setTopTwo] = useState([]);
  const [chartData, setChartData] = useState([]);

  const sortedData = useMemo(() => {
    return [...data]
      .filter((d) => !!d.name && d.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [data]);

  useEffect(() => {
    setChartData(sortedData);
  }, [sortedData]);

  useEffect(() => {
    if (reviewCount === 0) {
      setTopReviewSpeech("리뷰 작성 내역이\n 없습니다.");
      return;
    }

    let isMounted = true;

    const fetchReviewData = async () => {
      try {
        const enriched = await Promise.all(
          sortedData.map(async ({ name }) => {
            const trimmedName = name.trim();
            const enumType = KOR_TO_ENUM_MAP[trimmedName];
            if (!enumType) return null;

            const res = await getConsumptionDetail(enumType);
            const { consumption, reviewCount: typeReviewCount } = res;
            const korTypeName =
              ENUM_TO_KOR_MAP[consumption?.companyType?.trim()];
            return {
              name: trimmedName,
              value: typeReviewCount,
              reviewCount: typeReviewCount,
              reviewRatio: typeReviewCount / reviewCount,
              speech: SPEECH_BUBBLE_MAP[korTypeName],
              companyType: consumption?.companyType?.trim(),
            };
          })
        );

        const valid = enriched.filter(Boolean);
        const ranked = valid.sort((a, b) => b.reviewRatio - a.reviewRatio);

        if (isMounted) {
          setTopReviewSpeech(
            ranked[0]?.speech || "리뷰 작성 내역이\n 없습니다."
          );
          setTopTwo(ranked.slice(0, 2));
          setChartData(ranked.slice(0, 6));
          if (ranked[0]?.companyType && onTopCategory) {
            onTopCategory(ranked[0].companyType);
          }
        }
      } catch (err) {
        console.error("전체 오류:", err);
        if (isMounted) {
          setTopReviewSpeech("리뷰 작성 내역이\n 없습니다.");
        }
      }
    };

    fetchReviewData();

    return () => {
      isMounted = false;
    };
  }, [reviewCount, sortedData, onTopCategory]);

  return (
    <div className="w-full mx-auto flex items-center justify-center gap-5 sm:gap-8">
      <div className="relative w-[140px] h-[140px] shrink-0 ">
        <PieChart width={140} height={140}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={65}
            paddingAngle={0}
            isAnimationActive={true}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLOR_MAP[index]} />
            ))}
          </Pie>
          <Tooltip
            content={<CustomTooltip />}
            wrapperStyle={{ zIndex: 1000 }}
          />
        </PieChart>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-h1 font-bold text-gray-11">
            <span className="text-caption2 font-semibold text-gray-8 mr-1">
              총
            </span>
            {reviewCount}
            <span className="text-caption2 font-semibold text-gray-8 ml-1">
              건
            </span>
          </p>
          <p className="text-caption2 font-semibold text-gray-8">기반</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 items-center">
        <div className="relative w-[200px]">
          <img
            src="/svgs/support/consumer/Ic_speechBubble.svg"
            alt="말풍선"
            className="w-full"
          />
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ml-1 text-b4 font-semibold text-gray-12 text-center w-[130px] whitespace-pre-line">
            {topReviewSpeech}
          </p>
        </div>

        <div className="flex flex-col gap-2 text-caption2 font-semibold mt-4 ml-0 sm:ml-5">
          {topTwo.map((item, index) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: COLOR_MAP[index] }}
              />
              <span className={index === 0 ? "text-gray-11" : "text-gray-8"}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsumptionChart;
