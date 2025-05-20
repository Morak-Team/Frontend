import ReviewContent from "@/pages/map/components/review/ReviewContent";
import { useNavigate } from "react-router-dom";
import { useGetCompanyPreview } from "@/apis/company/queries";
import { businessTypeNameMap } from "@/constants/categoryMap";

import useLikeStore from "@/store/useLikeStore";
import useUserInfoStore from "@/store/userInfoStore";
import { useLikeToggle } from "@/hooks/useLikeToggle";

const ReviewItem = ({ data }) => {
  const navigate = useNavigate();
  const { data: companyData } = useGetCompanyPreview(data.companyId);

  const { userInfo } = useUserInfoStore();

  const { likedMap } = useLikeStore();
  const isGloballyLiked = likedMap[data.companyId] ?? false;

  const { isLoggedIn, toggleLike } = useLikeToggle(data.companyId);

  const combinedReviews = {
    ...data,
    name: userInfo.name,
    profileColor: userInfo.profileColor,
  };

  return (
    <div
      className="flex flex-col rounded-md pt-6 px-5 bg-white"
      onClick={() => navigate(`/review/${data.companyId}`)}
    >
      <div className="flex justify-between border-b-[2px] border-gray-3 pb-6">
        <div className="flex flex-col gap-2">
          <div className="flex gap-1 items-center">
            <p className="h4">{companyData?.companyName}</p>
            <p className="b5 text-gray-6">
              {businessTypeNameMap[companyData?.companyCategory ?? "기타"]}
            </p>
          </div>
          <p className="b6">{companyData?.companyLocation}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike();
          }}
        >
          <img
            src={
              isLoggedIn && isGloballyLiked
                ? "/svgs/storeReview/fullHeartIcon.svg"
                : "/svgs/common/Ic_Heart-Empty.svg"
            }
            alt="좋아요 버튼"
            className="w-6 h-6"
          />
        </button>
      </div>

      <div>
        <ReviewContent item={combinedReviews} hasBorder={false} />
      </div>
    </div>
  );
};

export default ReviewItem;
