// src/pages/map/utils/formatDateTime.js
export function formatDateTime(orderDateTime = "") {
  // orderDateTime이 빈 문자열이면 바로 기본값 반환
  if (!orderDateTime) {
    return {
      date: { month: "", day: "" },
      time: { period: "", hour: "", minute: "" },
    };
  }

  // "2025-05-01 15:24:34" → ["2025-05-01","15:24:34"]
  const [datePart, timePart] = orderDateTime.split(" ");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour24, minute] = timePart.split(":").map((v) => Number(v));

  // 로컬 타임존 기준 Date 생성
  const dt = new Date(year, month - 1, day, hour24, minute);

  const monthsKR = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const period = dt.getHours() < 12 ? "오전" : "오후";
  const hour12Raw = dt.getHours() % 12;
  const hour12 = hour12Raw === 0 ? 12 : hour12Raw;

  return {
    date: {
      month: monthsKR[dt.getMonth()],
      day: `${dt.getDate()}일`,
    },
    time: {
      period,
      hour: `${hour12}시`,
      minute: `${dt.getMinutes()}분`,
    },
  };
}
