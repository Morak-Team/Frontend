import { useEffect, useState } from "react";

const WritingReviewPage = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const stored = sessionStorage.getItem("reviewResult");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  if (!data) return <p>결과가 없습니다.</p>;
  return (
    <>
      <p>{data}</p>
    </>
  );
};

export default WritingReviewPage;
