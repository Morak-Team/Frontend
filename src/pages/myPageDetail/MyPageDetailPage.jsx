import { useNavigate, useLocation } from "react-router-dom";
import heart from "/svgs/myPage/heart.svg";
import cheer from "/svgs/myPage/cheer.svg";
import review from "/svgs/myPage/review.svg";
import { useGetReviews, useGetCheers } from "@/apis/myPage/queries";
import ReviewItem from "@/pages/myPageDetail/components/ReviewItem";
import StoryItem from "@/pages/myPageDetail/components/StoryItem";
import noResult from "/svgs/myPage/noResult.svg";
import Spinner from "@/components/common/Spinner";

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

  if (isLoadingReviews || isLoadingCheers) {
    return (
      <div className="flex justify-center items-center container">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col pt-5 container overflow-y-auto scrollbar-hide">
      <div className="mt-10 px-5 mb-4" onClick={() => navigate(-1)}>
        <img src="/svgs/myPage/backIcon.svg" className="cursor-pointer" />
      </div>

      {kind === "리뷰" && (
        <>
          {!isLoadingReviews && reviewsData?.length > 0 ? (
            reviewsData?.map((item, idx) => (
              <ReviewItem data={item} key={idx} />
            ))
          ) : !isLoadingReviews && reviewsData?.length === 0 ? (
            <div className="flex flex-col justify-center items-center mt-36">
              <img src={noResult} />
              <p className="h4 text-gray-9 text-center py-8">
                아직 작성한 리뷰가
                <br /> 없어요
              </p>
            </div>
          ) : null}
        </>
      )}

      {kind === "응원" && (
        <>
          {!isLoadingCheers && cheersData?.length > 0 ? (
            cheersData?.map((item) => (
              <StoryItem item={item} key={item.storyId} />
            ))
          ) : !isLoadingCheers && cheersData?.length === 0 ? (
            <div className="flex flex-col justify-center items-center mt-36">
              <img src={noResult} />
              <p className="h4 text-gray-9 text-center py-8">
                아직 응원한 이야기가
                <br /> 없어요
              </p>
            </div>
          ) : null}
        </>
      )}

      {kind === "찜" && (
        <div className="flex justify-between items-center px-5">
          <div className="flex gap-2 items-center my-2">
            <img src={heart} className="w-8 h-8" />
            <p className="h3">저장한 장소</p>
          </div>
          <p className="b5 text-gray-9">총 0개</p>
        </div>
      )}

      <div className="flex flex-col gap-4 w-full bg-gray-2 p-5 min-h-screen">
        {kind === "리뷰" && (
          <>
            {reviewsData?.length > 0 ? (
              reviewsData.map((item, idx) => (
                <ReviewItem data={item} key={idx} />
              ))
            ) : (
              <div className="flex flex-col justify-center items-center mt-36">
                <img src={noResult} />
                <p className="h4 text-gray-9 text-center py-8">
                  아직 작성한 리뷰가
                  <br /> 없어요
                </p>
              </div>
            )}
          </>
        )}

        {kind === "응원" && (
          <>
            {cheersData?.length > 0 ? (
              cheersData.map((item) => (
                <StoryItem item={item} key={item.storyId} />
              ))
            ) : (
              <div className="flex flex-col justify-center items-center mt-36">
                <img src={noResult} />
                <p className="h4 text-gray-9 text-center py-8">
                  아직 응원한 이야기가
                  <br /> 없어요
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyPageDetailPage;
