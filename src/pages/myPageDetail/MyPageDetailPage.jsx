import { useNavigate, useLocation } from "react-router-dom";
import heart from "/svgs/myPage/heart.svg";
import cheer from "/svgs/myPage/cheer.svg";
import review from "/svgs/myPage/review.svg";
import {
  useGetHearts,
  useGetReviews,
  useGetCheers,
} from "@/apis/myPage/queries";
import ReviewItem from "@/pages/myPageDetail/components/ReviewItem";
import StoryItem from "@/pages/myPageDetail/components/StoryItem";
import noResult from "/svgs/myPage/noResult.svg";
import Spinner from "@/components/common/Spinner";
import HeartItem from "./components/HeartItem";
import { useEffect, useMemo, useState } from "react";
import { getAllCompanies } from "@/apis/company/getAllCompanies";

const MyPageDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const kind = location.state.kind;

  const [allCompanies, setAllCompanies] = useState([]);

  const { data: heartsData, isLoading: isLoadingHearts } = useGetHearts({
    enabled: kind === "찜",
  });

  useEffect(() => {
    if (kind === "찜") {
      getAllCompanies().then(setAllCompanies);
    }
  }, [kind]);

  const companyMap = useMemo(() => {
    return new Map(allCompanies.map((c) => [c.companyId, c]));
  }, [allCompanies]);

  const enrichedHeartsData = heartsData?.map((heart) => {
    const matched = companyMap.get(heart.companyId);
    return {
      ...heart,
      latitude: matched?.latitude,
      longitude: matched?.longitude,
    };
  });

  const { data: reviewsData, isLoading: isLoadingReviews } = useGetReviews({
    enabled: kind === "리뷰",
  });
  const { data: cheersData, isLoading: isLoadingCheers } = useGetCheers({
    enabled: kind === "응원",
  });

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
        <div className="flex justify-between items-center px-5">
          <div className="flex gap-2 items-center my-2">
            <img src={review} className="w-8 h-8" />
            <p className="h3">내가 작성한 리뷰</p>
          </div>
          <p className="b5 text-gray-9">총 {reviewsData?.length}개</p>
        </div>
      )}

      {kind === "찜" && (
        <div className="flex justify-between items-center px-5">
          <div className="flex gap-4 items-center my-2">
            <img src={heart} className="w-8 h-8" />
            <p className="h3">저장한 장소</p>
          </div>
          <p className="b5 text-gray-9">총 {heartsData?.length}개</p>
        </div>
      )}

      {kind === "응원" && (
        <div className="flex justify-between items-center px-5">
          <div className="flex gap-2 items-center my-2">
            <img src={cheer} className="w-8 h-8" />
            <p className="h3">내가 응원한 이야기</p>
          </div>
          <p className="b5 text-gray-9">총 {cheersData?.length}개</p>
        </div>
      )}

      <div className="flex flex-col gap-4 w-full bg-gray-2 p-5">
        {kind === "찜" && (
          <>
            {!isLoadingHearts && enrichedHeartsData?.length > 0 ? (
              enrichedHeartsData.map((item, idx) => (
                <HeartItem data={item} key={idx} />
              ))
            ) : !isLoadingHearts && enrichedHeartsData?.length === 0 ? (
              <div className="flex flex-col justify-center items-center mt-36">
                <img src={noResult} />
                <p className="h4 text-gray-9 text-center py-8">
                  아직 저장한 장소가
                  <br /> 없어요
                </p>
              </div>
            ) : null}
          </>
        )}

        {kind === "리뷰" && (
          <>
            {!isLoadingReviews && reviewsData?.length > 0 ? (
              reviewsData.map((item, idx) => (
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
              cheersData.map((item) => (
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
      </div>
    </div>
  );
};

export default MyPageDetailPage;
