import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Step7 = ({ onNext, defaultValue, userInfo, recommendResult }) => {
  const navigate = useNavigate();
  console.log(recommendResult);

  return (
    <div className="relative w-full min-h-screen bg-white flex justify-center scrollbar-hide">
      <div className="w-full max-w-[760px] px-5 pt-8 pb-24 overflow-y-auto">
        <p className="h2 mt-4">
          당신을 위한 <br /> 금융상품 추천
        </p>

        <div className="mt-10 flex gap-4 shadow-surface px-6 py-5 flex-col">
          <div className="flex gap-4">
            <img src="/svgs/support/company/thumb.svg" className="w-8 h-8" />
            <div className="flex flex-col gap-1">
              <p className="h4">{recommendResult.product.title}</p>
              <p className="caption2 text-gray-9">
                {recommendResult.product.agency}
              </p>
            </div>
          </div>

          <p className="b4 text-secondary mt-4 mb-2">금융상품 소개</p>
          <div className="p-4 bg-gray-2">
            <p className="b2">{recommendResult.product.description}</p>
            <br />
            <p className="b2">{recommendResult.closing}</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 w-full max-w-[760px] flex justify-center bg-white py-4 shadow-md z-50">
        <button
          className="w-80 sm:w-[80%] bg-secondary b5 text-white py-3 rounded-xl"
          onClick={() => navigate("/support")}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Step7;
