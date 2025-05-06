import { PieChart, Pie, Cell } from "recharts";

const COLOR_MAP = [
  "rgba(255, 111, 49, 1)", // 1위 (primary-8)
  "rgba(53, 171, 255, 1)", // 2위 (secondary)
  "rgba(155, 213, 255, 1)", // 3위
  "rgba(233, 246, 255, 1)", // 4위
  "rgba(255, 255, 255, 1)", // 5위
];

const ConsumptionChart = ({ data }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const sortedData = [...data].sort((a, b) => b.value - a.value).slice(0, 5);
  const first = sortedData[0]?.name;
  const second = sortedData[1]?.name;

  return (
    <div className="w-full max-w-[700px] mx-auto flex sm:flex-row items-center sm:justify-center gap-6 sm:gap-10">
      <div className="relative w-[180px] h-[180px] shrink-0">
        <PieChart width={180} height={180}>
          <Pie
            data={sortedData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
          >
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLOR_MAP[index]} />
            ))}
          </Pie>
        </PieChart>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-h1 font-bold text-gray-11">
            <span className="text-caption2 font-semibold text-gray-8 mr-1">
              총
            </span>
            {total}
            <span className="text-caption2 font-semibold text-gray-8 ml-1">
              건
            </span>
          </p>
          <p className="text-caption2 font-semibold text-gray-8">기반</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 items-center">
        <div className="relative w-[160px]">
          <img
            src="/svgs/support/consumer/Ic_speechBubble.svg"
            alt="말풍선"
            className="w-full"
          />
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ml-1 text-b4 font-semibold text-gray-12 text-center w-[130px]">
            누군가의 일자리를 <br />
            지킨 따뜻한 소비를 <br />
            하셨군요!
          </p>
        </div>

        <div className="flex flex-col gap-2 text-caption2 font-semibold mt-4 ml-0 sm:ml-5">
          {first && (
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: COLOR_MAP[0] }}
              />
              <span className="text-gray-11">{first}</span>
            </div>
          )}
          {second && (
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: COLOR_MAP[1] }}
              />
              <span className="text-gray-8">{second}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsumptionChart;
