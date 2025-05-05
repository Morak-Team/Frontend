import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SupportItemPage = () => {
  const { announcementId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-5.25rem)] overflow-y-auto">
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
          <div className="text-error bg-errorContainer caption1 px-2 py-1 w-fit rounded-md">
            D-3
          </div>
          <div className="bg-secondaryBackground py-1 w-fit rounded-md text-center b4 text-secondary px-2">
            기술
          </div>
        </div>

        <p className="h2 mt-4">「2025 코리아 엑스포 파리」</p>
        <p className="b5 text-gray-9 mt-2">대중소기업농어업협력재단</p>

        <div className="bg-gray-2 w-full mt-5 h-21 rounded-md p-5">
          <p className="b4 text-gray-8">신청기간</p>
          <p className="b2">2025년 12월 30일 ~ 2025년 12월 30일</p>
        </div>

        <p className="b4 mt-8 ml-5 text-secondary">지원사업 소개</p>
        <div className="bg-gray-2 w-full rounded-md mt-2 pt-6 pb-6 px-4">
          <p className="b2">
            「2025 코리아 엑스포 파리」 참여기업 모집 공고가 나왔어요.
            중소기업과 특례대상 중견기업들이 해외 홍보와 판로 개척을 위한 기회를
            잡을 수 있는 행사인데요. 「2025 코리아 엑스포 파리」 참여기업 모집
            공고가 나왔어요. 중소기업과 특례대상 중견기업들이 해외 홍보와 판로
            개척을 위한 기회를 잡을 수 있는 행사인데요. 「2025 코리아 엑스포
            파리」 참여기업 모집 공고가 나왔어요. 중소기업과 특례대상
            중견기업들이 해외 홍보와 판로 개척을 위한 기회를 잡을 수 있는
            행사인데요.
          </p>
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
      </div>
    </div>
  );
};

export default SupportItemPage;
