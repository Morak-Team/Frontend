import FOAItem from "@/pages/support/components/FOAItem";
import { useNavigate } from "react-router-dom";
import { useGetAnnouncement } from "@/apis/announcement/queries";
import Spinner from "@/components/common/Spinner";

const SupportListPage = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetAnnouncement();

  if (isLoading) {
    return (
      <div className="flex w-full container justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col pr-5 pl-5 container overflow-y-auto pb-5 mb-5 scrollbar-hide">
      <div className="mt-16 flex justify-between items-center">
        <p className="h3">진행 중인 지원사업</p>
        <img
          src="/svgs/support/company/xIcon.svg"
          className="w-8 h-8"
          onClick={() => navigate(-1)}
        />
      </div>

      <div className="mt-10">
        <p className="b5 text-gray-9">총 {data?.length || 0}개</p>
      </div>

      <div className="mt-3 flex flex-col gap-y-3">
        {data?.map((item, idx) => (
          <FOAItem data={item} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default SupportListPage;
