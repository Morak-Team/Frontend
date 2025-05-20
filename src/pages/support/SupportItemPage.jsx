import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGetFOADetail } from "@/apis/announcement/queries";
import {
  isValidDateFormat,
  calculateDday,
} from "@/pages/support/utils/dateFunc";

const SupportItemPage = () => {
  const navigate = useNavigate();
  const { announcementId } = useParams();
  const { data, isLoading } = useGetFOADetail(announcementId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isDdayAvailable = data?.endDate && isValidDateFormat(data.endDate);
  const dday = isDdayAvailable ? calculateDday(data.endDate) : null;

  return (
    <div className="flex flex-col container overflow-y-auto">
      {isLoading && (
        <div className="absolute inset-0 z-50 bg-white bg-opacity-80 flex flex-col justify-center items-center">
          <div className="loader"></div>
        </div>
      )}
      {/* 이미지 영역 */}
      <div className="relative w-full">
        <img
          src="/svgs/support/company/background.svg"
          className="w-full object-cover h-44 sm:h-52"
          alt="배경 이미지"
        />
        {/* 뒤로가기 아이콘 */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 left-3 p-2"
        >
          <img
            src="/svgs/support/company/backIcon.svg"
            alt="뒤로가기"
            className="w-8 h-8"
          />
        </button>
      </div>

      <div className="flex flex-col px-5 pb-5">
        <div className="flex gap-1 mt-9">
          {isDdayAvailable && (
            <div className="text-error bg-errorContainer caption1 px-2 py-1 w-fit rounded-md">
              {dday}
            </div>
          )}
          <div className="bg-secondaryBackground py-1 w-fit rounded-md text-center b4 text-secondary px-2">
            {data?.announcementType}
          </div>
        </div>

        <p className="h2 mt-4">{data?.title}</p>
        <p className="b5 text-gray-9 mt-2">{data?.organization}</p>

        <div className="bg-gray-2 w-full mt-5 h-21 rounded-md p-5">
          <p className="b4 text-gray-8">신청기간</p>
          <p className="b2">
            {data?.startDate} ~ {data?.endDate}
          </p>
        </div>

        <p className="b4 mt-8 ml-5 text-secondary">지원사업 소개</p>
        <div className="bg-gray-2 w-full rounded-md mt-2 pt-6 pb-6 px-4">
          {data?.summary?.split("\n\n").map((paragraph, idx) => {
            const isImageUrl = paragraph
              .trim()
              .match(/^https?:\/\/.*\.(png|jpg|jpeg|gif|webp)(\?.*)?$/i);
            return isImageUrl ? (
              <img
                key={idx}
                src={paragraph.trim()}
                alt="지원사업 이미지"
                className="w-full mb-4 rounded-md"
              />
            ) : (
              <p key={idx} className="b2 mb-3 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        <div className="caption2 text-gray-8 mt-10 pl-2">
          <p>
            • 본 서비스에서 제공하는 지원사업 정보는 각 기관의 공고를 바탕으로
            수집·정리한 참고용 자료입니다.
          </p>
          <p>
            • 정보의 정확성 또는 최신성은 보장되지 않으며, 실제 신청 전에는
            반드시 해당 기관에 직접 확인하시기 바랍니다.
          </p>
        </div>

        <button
          onClick={() => {
            if (data?.link) {
              window.open(data.link, "_blank");
            }
          }}
        >
          <div className="flex gap-2 bg-secondary justify-center items-center mt-14 rounded-md h-12 w-full">
            <img src="/svgs/support/company/linkIcon.svg" className="w-6 h-6" />
            <p className="b1 text-white">바로가기</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SupportItemPage;
