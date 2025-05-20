import {
  companyTypeNameMap,
  companyTypeIconMap,
  businessTypeNameMap,
} from "@constants/categoryMap";
import HeartIcon from "/svgs/common/Ic_Heart_Fill.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unlikeCompany } from "@apis/company/getLikedCompanies";
import ToastModal from "@components/common/ToastModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeartItem = ({ data }) => {
  const {
    companyId,
    companyName,
    companyCategory,
    companyType,
    companyLocation,
    business,
    distance,
  } = data;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/map/${companyId}`);
  };

  const formattedDistance =
    typeof distance === "number" ? `${distance.toFixed(1)}km` : null;

  const queryClient = useQueryClient();
  const [toastVisible, setToastVisible] = useState(false);

  const { mutate: unlike, isLoading } = useMutation({
    mutationFn: () => unlikeCompany(companyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userHearts"] });
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2000);
    },
  });

  const handleUnlike = (e) => {
    e.stopPropagation();
    if (!isLoading) unlike();
  };

  return (
    <>
      <div
        className="bg-white rounded-xl p-5 flex flex-col gap-3 shadow-sm cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex justify-between">
          <div>
            <p className="h4 text-gray-12">
              {companyName}
              <span className="ml-1 b5 text-gray-6">
                {businessTypeNameMap[companyCategory] ?? companyCategory}
              </span>
            </p>
            {formattedDistance && (
              <p className="text-sm font-medium text-primary-8 mt-1">
                {formattedDistance}
              </p>
            )}
            <p className="text-sm text-gray-10">{companyLocation}</p>
          </div>

          <button onClick={handleUnlike} aria-label="찜 버튼">
            <img src={HeartIcon} alt="찜 아이콘" className="w-6 h-6" />
          </button>
        </div>

        {business && (
          <section>
            <div className="bg-secondaryBackground w-full px-4 py-3 rounded-lg b5 whitespace-pre-line text-secondaryText">
              <p className="break-keep whitespace-pre-line">{business}</p>

              {companyType && (
                <div className="inline-flex mt-3 items-center gap-2 px-3 py-1 rounded-xl bg-white w-fit">
                  <img
                    src={companyTypeIconMap[companyTypeNameMap[companyType]]}
                    alt={companyType}
                    className="w-5 h-5"
                  />
                  <span className="caption2 text-secondaryText">
                    {companyTypeNameMap[companyType]}
                  </span>
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      {toastVisible && (
        <ToastModal
          message="저장이 취소되었습니다"
          onClose={() => setToastVisible(false)}
        />
      )}
    </>
  );
};

export default HeartItem;
