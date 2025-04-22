import { useEffect, useState } from "react";

const WritingReviewPage = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const stored = sessionStorage.getItem("reviewResult");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  const recapture = () => {};

  //   if (!data) return <p>결과가 없습니다.</p>;

  return (
    <>
      <div className="flex justify-center">
        <div>
          <h1 className="text-2xl font-bold mt-20">
            태백 농협 하나로마트에 다녀오셨군요!
          </h1>
          <button
            className="text-2xl font-bold mt-20 border border-black p-10"
            onClick={recapture}
          >
            아니에요
          </button>
        </div>
      </div>
    </>
  );
};

export default WritingReviewPage;
