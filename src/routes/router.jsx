import { createBrowserRouter } from "react-router-dom";
import Home from "@pages/home/Home";
import KakaoAuth from "@pages/kakaoAuth/kakaoAuth";
import MapPage from "@pages/map/MapPage";

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
]);

export default router;
