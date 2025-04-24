import { useNavigate } from "react-router-dom";

const ConfirmImage = ({ onReject }) => {
  const navigate = useNavigate();
  const data = JSON.parse(sessionStorage.getItem("reviewResult") || "{}");

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col max-w-[760px] mx-auto">
      <div className="flex justify-end w-full mt-14 pr-5">
        <img src="/svgs/review/xIcon.svg" className="w-8 h-8" />
      </div>

      <div className="mt-6 mb-14">
        <p className="text-xl font-bold mb-6 text-center">
          <span className="h2 text-orange-500">
            {data.placeName || "이 장소"}
          </span>
          <span className="h2 text-gray-12">에 다녀오셨군요!</span>
        </p>
      </div>

      <div className="mt-3 mb-3 text-center">
        <p className="b5 text-gray-9">이때 방문하신 것이 맞나요?</p>
      </div>

      <div className="flex gap-2 w-full justify-center items-center">
        <div className="w-40 h-16 bg-gray-2 rounded-md flex justify-center items-center gap-8">
          <p className="b1 text-gray-12">2월 14일</p>
          <button className="b4 text-orange-500">수정</button>
        </div>
        <div className="w-40 h-16 bg-gray-2 rounded-md flex justify-center items-center gap-8">
          <p className="b1 text-gray-12">오전 11: 45</p>
          <button className="b4 text-orange-500">수정</button>
        </div>
      </div>

      <div className="mt-8 mb-3 text-center">
        <p className="b5 text-gray-9">이곳이 맞나요?</p>
      </div>

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
