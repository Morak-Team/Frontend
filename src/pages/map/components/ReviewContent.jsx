const ReviewContent = ({ setTurnOnCamera }) => {
  return (
    <>
      <div className="mt-10 flex justify-between">
        <div className="flex justify-center items-center gap-2">
          <h3 className="font-semibold text-xl">리뷰</h3>
          <span>27개</span>
        </div>

        <button
          className="text-sm text-orange-500"
          onClick={() => setTurnOnCamera(true)}
        >
          ✏️ 리뷰 쓰기
        </button>
      </div>
      <h1 className="text-lg font-bold mb-5">온도 98도</h1>
    </>
  );
};

export default ReviewContent;
