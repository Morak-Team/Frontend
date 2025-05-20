import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGetFinancialProductDetail } from "./hooks/useFinancialProductDetail";
import Spinner from "@components/common/Spinner";

const FinancialProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetFinancialProductDetail(productId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-5.25rem)]">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-5.25rem)]">
        <p className="b3 text-gray-10">데이터를 불러오지 못했습니다.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-5.25rem)]">
        <p className="b3 text-gray-10">해당 상품 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col container overflow-y-auto">
      <div className="relative w-full">
        <img
          src="/svgs/support/consumer/Img_FinancialProduct.svg"
          className="w-full object-cover h-44 sm:h-52"
          alt="배경 이미지"
        />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-1/4 left-3 p-2 cursor-pointer"
        >
          <img
            src="/svgs/support/company/backIcon.svg"
            alt="뒤로가기"
            className="w-8 h-8"
          />
        </button>
      </div>

      <div className="flex flex-col px-5 pb-5">
        <div className="flex gap-2 mt-9">
          {data.productType &&
            data.recommendedCategory &&
            data.defaultCategory && (
              <>
                <span className="caption2 text-error bg-errorContainer px-2 py-1 rounded">
                  {data.productType}
                </span>
                <span className="caption2 text-secondary bg-secondaryBackground px-2 py-1 rounded">
                  {data.recommendedCategory}
                </span>
                <span className="caption2 text-secondary bg-secondaryBackground px-2 py-1 rounded">
                  {data.defaultCategory}
                </span>
              </>
            )}
        </div>

        <p className="h2 mt-4">{data.productName}</p>
        <p className="b5 text-gray-9 mt-2">{data.bankName}</p>

        <p className="b4 mt-8 ml-5 text-primary-8">기본 정보</p>
        <div className="mt-2 flex flex-col gap-2">
          <div className="bg-gray-2 rounded-md px-5 py-4 break-keep">
            <p className="b4 text-gray-8 mb-1">가입 기간</p>
            <p className="b2 text-gray-12">{data.period || "-"}</p>
          </div>
          <div className="bg-gray-2 rounded-md px-5 py-4 break-keep">
            <p className="b4 text-gray-8 mb-1">방식</p>
            <p className="b2 text-gray-12 font-medium">{data.method || "-"}</p>
          </div>
          <div className="bg-gray-2 rounded-md px-5 py-4 break-keep">
            <p className="b4 text-gray-8 mb-1">기본 금리</p>
            <p className="b2 text-gray-12 font-medium">{data.benefit || "-"}</p>
          </div>
        </div>

        <p className="b4 mt-8 ml-5 text-primary-8 break-keep">금융상품 소개</p>
        <div className="bg-gray-2 w-full rounded-md mt-2 pt-6 pb-6 px-4">
          <p className="b2 text-gray-12 whitespace-pre-wrap">
            {data.productDescription || "상품 설명이 없습니다."}
          </p>
        </div>

        <div className="caption2 text-gray-8 mt-10 pl-2 break-keep">
          <p>
            • 본 서비스에서 제공하는 상품 정보는 각 기관의 공고를 바탕으로
            수집·정리한 참고용 자료입니다.
          </p>
          <p>
            • 정보의 정확성 또는 최신성은 보장되지 않으며, 실제 신청 전에는
            반드시 해당 기관에 직접 확인하시기 바랍니다.
          </p>
        </div>

        {data.productLink && (
          <button
            onClick={() => window.open(data.productLink, "_blank")}
            className="flex gap-2 bg-primary-8 justify-center items-center mt-14 rounded-xl h-12 w-full"
            aria-label="금융상품 링크 (새 창에서 열림)"
          >
            <img
              src="/svgs/support/company/linkIcon.svg"
              className="w-6 h-6"
              alt="바로가기"
            />
            <p className="b1 text-white text-center">바로가기</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default FinancialProductDetailPage;
