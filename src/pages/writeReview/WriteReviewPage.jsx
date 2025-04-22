import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReviewImageCapture from "@/pages/map/components/ReviewImageCapture";

const WriteReviewPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [recapturing, setRecapturing] = useState(false); // 👈 추가

  useEffect(() => {
    const stored = sessionStorage.getItem("reviewResult");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  const handleRecapture = () => {
    // 기존 데이터 제거
    sessionStorage.removeItem("reviewResult");
    setData(null);
    setRecapturing(true); // 👈 다시 캡처하도록 상태 변경
  };

  return (
    <>
      {recapturing ? (
        <div className="mx-auto w-full max-w-[760px] h-[667px] bg-black relative">
          <ReviewImageCapture storeId={1} turnOnCamera={true} />
        </div>
      ) : (
        <div className="flex justify-center">
          <div>
            <h1 className="text-2xl font-bold mt-20">
              태백 농협 하나로마트에 다녀오셨군요!
            </h1>
            <button
              className="text-2xl font-bold mt-20 border border-black p-10"
              onClick={handleRecapture}
            >
              아니에요
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WriteReviewPage;
