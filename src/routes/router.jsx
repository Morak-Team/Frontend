import { createBrowserRouter } from "react-router-dom";
import LayoutWithTab from "@/components/layout/LayoutWithTab";

import Home from "@pages/home/Home";
import KakaoAuth from "@pages/kakaoAuth/kakaoAuth";
import MapPage from "@pages/map/MapPage";
import MyPage from "@/pages/myPage/MyPage";
import StoreReviewPage from "@/pages/review/StoreReviewPage";
import SearchPage from "@/pages/search/SearchPage";
import StoryPage from "@/pages/story/StoryPage";
import SupportPage from "@/pages/support/SupportPage";
import ErrorPage from "@/pages/error/ErrorPage";
import StoryDetail from "@/pages/story/components/StoryDetail";
import WriteReviewPage from "@/pages/writeReview/WriteReviewPage";

const router = createBrowserRouter([
  {
    element: <LayoutWithTab />, // 하단 탭이 있는 Layout
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/map",
        element: <MapPage />,
      },
      {
        path: "/map/search",
        element: <SearchPage />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
      {
        path: "/review/:storeId",
        element: <StoreReviewPage />,
      },
      {
        path: "/story",
        element: <StoryPage />,
      },
      {
        path: "/story/:storyId",
        element: <StoryDetail />,
      },
      {
        path: "/support",
        element: <SupportPage />,
      },
      {
        path: "/writereview",
        element: <WriteReviewPage />,
      },
    ],
  },
  {
    path: "/auth", // 탭 없는 별도 페이지
    element: <KakaoAuth />,
  },
]);

export default router;
