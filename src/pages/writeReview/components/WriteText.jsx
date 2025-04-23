import { useState } from "react";

const WriteText = ({ onNext, onBack }) => {
  const [text, setText] = useState("");

  return (
    <div className="w-full max-w-[480px] px-4 flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold mb-6">
        태백농협하나로마트는 어땠나요?
      </h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="리뷰를 작성해주세요."
        className="w-full h-40 p-4 text-base border rounded-md resize-none mb-4"
      />
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
        >
          이전
        </button>
        <button
          onClick={onNext}
          className="bg-orange-500 text-white px-6 py-2 rounded-md text-lg shadow"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default WriteText;
