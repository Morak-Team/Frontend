import { useParams } from "react-router-dom";
import { useInfinitePractice } from "@/apis/review/queries";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { getTopRatedMovies } from "@/apis/review/getReviews";

const StoreReviewPage = () => {
  const { storeId } = useParams();
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfinitePractice();

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  console.log("data", data);
  console.log(getTopRatedMovies());

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;

  return (
    <>
      <h1>가게의 리뷰들을 볼 수 있는 페이지입니다.</h1>
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
      </div>
    </>
  );
};

export default StoreReviewPage;
