import axios from "axios";
import api from "@/apis/instance/api";

// 연습용 영화 데이터 패칭 함수
export const getTopRatedMovies = async (page = 1) => {
  const res = await axios.get(`https://api.themoviedb.org/3/movie/top_rated`, {
    params: {
      language: "en-US",
      page,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    },
  });

  return res.data;
};

// 바텀시트 내부 약 3개의 리뷰 패칭
export const getReviewsForPreview = async (companyId) => {
  const res = await api.get("/reviews/public/get-company-reviews", {
    params: { companyId, size: 3 },
  });

  return res.data;
};

const PAGE_SIZE = 10;

export const getInfiniteReviews = async (storeId, page) => {
  const res = await api.get("/reviews/public/get-all-company-reviews", {
    params: { companyId: storeId, page, size: 10 },
  });
  return res.data;
};
