import { useNavigate } from "react-router-dom";

const ConfirmImage = ({ onReject }) => {
  const navigate = useNavigate();
  const data = JSON.parse(sessionStorage.getItem("reviewResult") || "{}");

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col justify-center items-center max-w-[760px] mx-auto">
      <h1 className="text-xl font-bold mb-6 text-center">
        {data.placeName || "이 장소"}에 다녀오셨군요!
      </h1>
      <button
        onClick={() => navigate("/write-review")}
        className="px-6 py-3 border border-black rounded text-lg"
      >
        맞아요
      </button>
      <button
        onClick={onReject}
        className="px-6 py-3 border border-black rounded text-lg"
      >
        아니에요
      </button>
    </div>
  );
};

export default ConfirmImage;
