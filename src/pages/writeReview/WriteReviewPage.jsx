import { useState } from "react";
import SelectTag from "@/pages/writeReview/components/SelectTag";
import WriteText from "@/pages/writeReview/components/WriteText";
import Complete from "@/pages/writeReview/components/Complete";

const WriteReviewPage = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className="text-3xl font-bold mt-20">
        태백 하나로 농협 마트는 어떠셨나요?
      </h1>
      <div className="w-48 h-48 flex justify-center flex-col items-center">
        <h1 className="text-xl">얼마나 따뜻해지셨나요?</h1>
        <h1 className="text-xl">0도</h1>
      </div>
      <div>
        <h1 className="text-xl font-bold">어떤 점이 좋았나요?</h1>
      </div>
    </div>
  );
};

export default WriteReviewPage;
