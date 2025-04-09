import { createBrowserRouter } from "react-router-dom";
import LayoutWithTab from "@/components/layout/LayoutWithTab";

import Home from "@pages/home/Home";
import KakaoAuth from "@pages/kakaoAuth/kakaoAuth";
import MapPage from "@pages/map/MapPage";
import MyPage from "@/pages/myPage/MyPage";
import SearchPage from "@/pages/search/SearchPage";

const router = createBrowserRouter([
  {
    element: <LayoutWithTab />, // 하단 탭이 있는 Layout
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
        path: "/myPage",
        element: <MyPage />,
      },
    ],
  },
  {
    path: "/auth", // 탭 없는 별도 페이지
    element: <KakaoAuth />,
  },
]);

export default router;
