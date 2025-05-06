import ConsumptionChart from "./ConsumptionChart";
import RecommendationCard from "./RecommendationCard";

const dummyData = [
  { name: "일자리제공형", value: 6 },
  { name: "지역사회공헌형", value: 4 },
  { name: "혼합형", value: 1 },
  { name: "환경개선형", value: 1 },
];

const recommendList = [
  {
    bank: "국민은행",
    title: "KB맑은하늘적금",
    description:
      "대중교통/자전거 이용 시 우대금리와 보험 혜택을 제공하는 친환경 적금 상품",
  },
  {
    bank: "신한은행",
    title: "아름다운 용기 적금",
    description:
      "다회용기 사용 등 환경 보호 실천 시 금리 우대를 제공하는 ESG 실천 적금",
  },
  {
    bank: "하나은행",
    title: "행복나눔 적금",
    description:
      "지정단체에 사랑과 나눔을 실천할 수 있는 적금",
  },
  {
    bank: "농협은행",
    title: "내가그린초록세상",
    description: "종이통장 미발행 및 친환경 실천 서약 시 금리 우대 제공",
  },
];

const ConsumerTab = () => {
  return (
    <div className="flex flex-col gap-14 px-5">
      <div>
        <h1 className="text-h3 font-semibold mb-6">모락님의 소비 가치</h1>
        <ConsumptionChart data={dummyData} />
      </div>

      <div>
        <h2 className="text-h3 font-semibold mb-5">
          소비 가치에 맞는 금융상품
        </h2>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {recommendList.map((item, idx) => (
            <div key={idx} className="min-w-[260px] flex-shrink-0">
              <RecommendationCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsumerTab;
