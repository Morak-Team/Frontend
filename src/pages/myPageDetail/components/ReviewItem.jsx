import ReviewContent from "@/pages/map/components/review/ReviewContent";

const dummyReviewItem = {
  name: "김소영",
  profileColor: "pink",
  temperature: 74.6,
  reviewContent:
    "제품 품질도 훌륭하고 청결하게 잘 관리되어 있었어요. 다시 방문하고 싶어요!",
  reviewCategories: ["GOOD_QUALITY", "CLEAN", "REVISIT"],
};

const ReviewItem = () => {
  return (
    <div className="flex flex-col rounded-md pt-6 px-5 bg-white">
      <div className="flex justify-between border-b-[2px] border-gray-3 pb-6">
        <div className="flex flex-col gap-2">
          <div className="flex gap-1 items-center">
            <p className="h4">블루웨일</p>
            <p className="b5 text-gray-6">카페</p>
          </div>
          <p className="b6">서울특별시 마포구 서교동 94 1층</p>
        </div>
        <img src="/svgs/Ic_Heart_Fill.svg" className="w-6 h-6" />
      </div>

      <div>
        <ReviewContent item={dummyReviewItem} hasBorder={false} />
      </div>
    </div>
  );
};

export default ReviewItem;
