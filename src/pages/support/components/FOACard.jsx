import { useNavigate } from "react-router-dom";

const FOACard = ({ data }) => {
  const navigate = useNavigate();

  // 날짜 포맷: 2025-06-05 → 6월 5일까지
  const formatEndDate = (raw) => {
    const match = raw?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return raw;
    const [, , mm, dd] = match;
    return `${parseInt(mm, 10)}월 ${parseInt(dd, 10)}일까지`;
  };

  // D-day 계산: 2025-06-05 → D-3
  const calculateDday = (raw) => {
    const match = raw?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return null;

    const targetDate = new Date(`${match[1]}-${match[2]}-${match[3]}`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? `D-${diffDays}` : null;
  };

  const formattedEndDate = formatEndDate(data.endDate);
  const dday = calculateDday(data.endDate);

  return (
    <div
      className="w-80 flex flex-col rounded-md shadow-surface bg-white shrink-0 snap-center"
      onClick={() => {
        if (data?.id) {
          navigate(`/support/list/${data.id}`);
        } else {
          navigate("/support/list");
        }
      }}
    >
      {/* 상단: 날짜 & D-day */}
      <div className="p-5 flex justify-between">
        <div className="flex gap-2">
          <div className="b4 text-gray-11 bg-gray-3 px-2 py-1 w-fit rounded-md">
            {formattedEndDate}
          </div>
          {dday && (
            <div className="text-error bg-errorContainer caption1 px-2 py-1 w-fit rounded-md">
              {dday}
            </div>
          )}
        </div>
        <img
          src="/svgs/support/company/forwardIcon.svg"
          className="w-4 h-4 cursor-pointer"
          alt="상세 보기"
        />
      </div>

      {/* 본문: 텍스트 내용 */}
      <div className="px-5 flex flex-col gap-2 mb-4 mt-9">
        <div className="bg-secondaryBackground py-1 w-fit rounded-md text-center b4 text-secondary px-2">
          {data.announcementType}
        </div>
        <p className="h3 leading-snug line-clamp-2">{data.title}</p>
        <p className="b5 text-gray-6">{data.organization}</p>
      </div>
    </div>
  );
};

export default FOACard;
