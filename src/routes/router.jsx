import { createBrowserRouter } from "react-router-dom";
import Home from "@pages/home/Home";
import KakaoAuth from "@pages/kakaoAuth/kakaoAuth";
import MapPage from "@pages/map/MapPage";
import MyPage from "@/pages/myPage/MyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    path: "/myPage",
    element: <MyPage />,
  },
]);

export default router;
