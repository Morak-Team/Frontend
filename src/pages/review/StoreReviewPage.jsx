import { useParams } from "react-router-dom";
import { useInfinitePractice } from "@/apis/review/queries";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { getTopRatedMovies } from "@/apis/review/getReviews";
import PlaceInfo from "@/pages/review/components/PlaceInfo";
import { useNavigate } from "react-router-dom";
import useUIStore from "@/store/uiStore";
import ReviewList from "@/pages/map/components/ReviewList";
import ReviewImageCapture from "@/pages/map/components/ReviewImageCapture";
import ConfirmImage from "@/pages/map/components/ConfirmImage";
import Reviews from "@/pages/review/components/Reviews";

const StoreReviewPage = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const { ref, inView } = useInView();
  const [showConfirm, setShowConfirm] = useState(false);

  const { turnOnCamera, setTurnOnCamera } = useUIStore();

  // const {
  //   data,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  //   isLoading,
  //   error,
  // } = useInfinitePractice();

  // useEffect(() => {
  //   if (inView && !isFetchingNextPage && hasNextPage) {
  //     fetchNextPage();
  //   }
  // }, [inView]);

  // console.log("data", data);
  // console.log(getTopRatedMovies());

  // if (isLoading) return <p>로딩 중...</p>;
  // if (error) return <p>에러 발생: {error.message}</p>;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between pt-14 mx-5 items-center">
        <img
          src="/svgs/storeReview/backIcon.svg"
          className="w-8 h-8"
          onClick={() => navigate(-1)}
        />
      </div>

      <PlaceInfo />

      <div className="w-full h-2 bg-gray-3 mt-5" />

      <div className="p-5">
        <Reviews setTurnOnCamera={setTurnOnCamera} storeId={storeId} />
      </div>

      {turnOnCamera && (
        <ReviewImageCapture
          storeId={storeId}
          turnOnCamera={turnOnCamera}
          onCloseCamera={() => setTurnOnCamera(false)}
          onCaptureSuccess={() => {
            setTurnOnCamera(false);
            setShowConfirm(true);
          }}
        />
      )}

      {showConfirm && (
        <ConfirmImage
          onReject={() => {
            sessionStorage.removeItem("reviewResult");
            setShowConfirm(false);
            setTurnOnCamera(true);
          }}
        />
      )}
      {/* <h1>가게의 리뷰들을 볼 수 있는 페이지입니다.</h1>
      <h1>이 가게의 아이디는 {storeId}입니다.</h1>

      <ul className="grid gap-4">
        {data?.pages.map((page, i) => (
          <div key={i}>
            {page.results.map((item) => (
              <li
                key={item.id}
                className="border p-4 rounded-md shadow-sm bg-white"
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.overview}</p>
              </li>
            ))}
          </div>
        ))}
      </ul>

      <div ref={ref} className="mt-6 text-center text-blue-600">
        {isFetchingNextPage
          ? "불러오는 중..."
          : hasNextPage
            ? "스크롤하면 더 가져옵니다 ↓"
            : "더 이상 데이터 없음!"}
      </div> */}
    </div>
  );
};

export default StoreReviewPage;
