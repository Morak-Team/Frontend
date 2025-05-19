import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import heart from "/svgs/myPage/heart.svg";
import cheer from "/svgs/myPage/cheer.svg";
import review from "/svgs/myPage/review.svg";
import { useGetReviews, useGetCheers } from "@/apis/myPage/queries";
import ReviewItem from "@/pages/myPageDetail/components/ReviewItem";
import StoryItem from "@/pages/myPageDetail/components/StoryItem";

const MyPageDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const kind = location.state.kind;

  const { data: reviewsData, isLoading: isLoadingReviews } = useGetReviews({
    enabled: kind === "리뷰",
  });
  const { data: cheersData, isLoading: isLoadingCheers } = useGetCheers({
    enabled: kind === "응원",
  });
  //   const { data: heartsData, isLoading: isLoadingHearts } = useGetHearts({ enabled: kind === "찜" });

  return (
    <div className="flex flex-col pt-5 container overflow-y-auto scrollbar-hide">
      <div className="mt-10 px-5 mb-4" onClick={() => navigate(-1)}>
        <img src="/svgs/myPage/backIcon.svg" className="cursor-pointer" />
      </div>

      {kind === "리뷰" && (
        <div className="flex justify-between items-center px-5">
          <div className="flex gap-2 items-center">
            <img src={review} className="w-12 h-12" />
            <p className="h3">내가 작성한 리뷰</p>
          </div>
          <p className="b5 text-gray-9">총 {reviewsData?.length}개</p>
        </div>
      )}

      {kind === "찜" && (
        <div className="flex justify-between items-center px-5">
          <div className="flex gap-2 items-center">
            <img src={heart} className="w-12 h-12" />
            <p className="h3">저장한 장소</p>
          </div>
          <p className="b5 text-gray-9">총 0개</p>
        </div>
      )}

      {kind === "응원" && (
        <div className="flex justify-between items-center px-5">
          <div className="flex gap-2 items-center">
            <img src={review} className="w-12 h-12" />
            <p className="h3">내가 응원한 이야기</p>
          </div>
          <p className="b5 text-gray-9">총 {cheersData?.length}개</p>
        </div>
      )}

      <div className="flex flex-col gap-4 w-full bg-gray-2 p-5 min-h-screen">
        {kind === "리뷰" && (
          <>
            <ReviewItem />
          </>
        )}

        {kind === "응원" &&
          cheersData.map((item) => (
            <StoryItem item={item} key={item.storyId} />
          ))}
      </div>
    </div>
  );
};

export default MyPageDetailPage;
