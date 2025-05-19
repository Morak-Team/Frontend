import { createBrowserRouter } from "react-router-dom";
import LayoutWithTab from "@/components/layout/LayoutWithTab";

import KakaoAuth from "@pages/kakaoAuth/kakaoAuth";
import MapPage from "@pages/map/MapPage";
import MyPage from "@pages/myPage/MyPage";
import StoreReviewPage from "@pages/review/StoreReviewPage";
import SearchPage from "@pages/search/SearchPage";
import StoryPage from "@pages/story/StoryPage";
import SupportPage from "@pages/support/SupportPage";
import StoryDetail from "@pages/story/components/StoryDetail";
import WriteReviewPage from "@/pages/writeReview/WriteReviewPage";
import SignUp from "@pages/join/SignUp";
import SupportListPage from "@pages/support/SupportListPage";
import SupportItemPage from "@pages/support/SupportItemPage";
import SupportRecommendPage from "@pages/support/SupportRecommendPage";
import FinancialProductList from "@pages/support/FinancialProductListPage";
import FinancialProductDetailPage from "@pages/support/FinancialProductDetailPage";
import MyPageDetailPage from "@/pages/myPageDetail/MyPageDetailPage";

const router = createBrowserRouter([
  {
    element: <LayoutWithTab />, // 하단 탭이 있는 Layout
    children: [
      {
        path: "/",
        element: <MapPage />,
      },
      {
        path: "/auth",
        element: <KakaoAuth />,
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
        path: "/mypage/detail",
        element: <MyPageDetailPage />,
      },
      {
        path: "/review/:companyId",
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
        path: "/support/recommend",
        element: <SupportRecommendPage />,
      },
      {
        path: "/support/list/:announcementId",
        element: <SupportItemPage />,
      },
      {
        path: "/consumer/list",
        element: <FinancialProductList />,
      },
      {
        path: "/consumer/list/:productId",
        element: <FinancialProductDetailPage />,
      },
      {
        path: "/support/list",
        element: <SupportListPage />,
      },
      {
        path: "/writereview",
        element: <WriteReviewPage />,
      },
    ],
  },
  {
    path: "/signup", // 탭 없는 별도 페이지
    element: <SignUp />,
  },
]);

export default router;
