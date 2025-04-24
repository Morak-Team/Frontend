const SelectTag = ({ onNext }) => {
  return (
    <div className="w-full px-4 flex flex-col items-center text-center pb-[10rem]">
      <h1 className="mb-6 bold h4">태백농협하나로마트는 어땠나요?</h1>

      <div className="w-40 h-40 bg-orange-100 rounded-full flex flex-col items-center justify-center mb-6">
        <p className="text-sm">얼마나 따뜻해지셨나요?</p>
        <p className="text-3xl font-bold text-orange-500">51도</p>
      </div>

      <p className="text-base font-semibold mb-4">어떤 점이 좋았나요?</p>

      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {[...Array(100)].map((_, idx) => (
          <button
            key={idx}
            className="bg-orange-100 px-4 py-2 rounded-full text-sm text-gray-700"
          >
            태그 {idx + 1}
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        className="bg-orange-500 text-white px-6 py-2 rounded-md text-lg shadow"
      >
        다음
      </button>
    </div>
  );
};

export default SelectTag;
