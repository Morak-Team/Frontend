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

// --------------- 실제 사용할 함수들 (수정 예정)
export const getReviews = async (storeId) => {
  const res = await api.get("/review", { params: { storeId, limit: 5 } });

  return res.data;
};

export const getInfiniteReviews = async (storeId, page) => {
  const res = await api.get("/review", { params: { storeId, page } });

  return res.data;
};
