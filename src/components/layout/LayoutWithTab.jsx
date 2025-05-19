import { Outlet } from "react-router-dom";
import BottomTab from "@/components/layout/BottomTab";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const LayoutWithTab = () => {
  const location = useLocation();

  useEffect(() => {
    sessionStorage.setItem("prevPath", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Outlet />
      <BottomTab />
    </>
  );
};

export default LayoutWithTab;
