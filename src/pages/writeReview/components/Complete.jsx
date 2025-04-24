const Complete = () => {
  return (
    <div className="w-full max-w-[480px] px-4 flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold text-orange-500 mb-2">
        리뷰 쓰기 완료!
      </h1>
      <p className="mb-6 text-sm text-gray-600">
        소중한 온기가 전달되었어요 :)
      </p>
      <div className="w-full h-48 bg-gray-100 rounded-md mb-6 flex items-center justify-center">
        <p className="text-gray-500">온기 리포트 무언가에 추가되는 모습</p>
      </div>
      <button className="bg-orange-500 text-white px-6 py-2 rounded-md text-lg shadow">
        확인
      </button>
    </div>
  );
};

export default Complete;
