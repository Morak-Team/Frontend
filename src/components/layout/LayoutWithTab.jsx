import { Outlet } from "react-router-dom";
import BottomTab from "@/components/layout/BottomTab";

const LayoutWithTab = () => {
  return (
    <>
      <Outlet />
      <BottomTab />
    </>
  );
};

export default LayoutWithTab;
