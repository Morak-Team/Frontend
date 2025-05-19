export const formatEndDate = (raw) => {
  const match = raw?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return raw;
  const [, , mm, dd] = match;
  return `${parseInt(mm, 10)}월 ${parseInt(dd, 10)}일까지`;
};

export const calculateDday = (raw) => {
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
