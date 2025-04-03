import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/home/Home";
import KakaoAuth from "@/pages/kakaoAuth/kakaoAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <KakaoAuth />,
  },
]);

export default router;
