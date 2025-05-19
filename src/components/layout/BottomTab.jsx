import { useLocation, useNavigate } from "react-router-dom";
import useUIStore from "@/store/uiStore";

const BottomTab = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { turnOnCamera, isBottomSheetOpen, isWriteReview, isStoryDetail } =
    useUIStore();

  if (isBottomSheetOpen || turnOnCamera || isWriteReview || isStoryDetail)
    return null;

  const tabs = [
    {
      path: "/map",
      label: "지도",
      icon: "/svgs/bottomTab/mapMenuIcon.svg",
      selectedIcon: "/svgs/bottomTab/selectedMapMenuIcon.svg",
      onClick: () => navigate("/map", { state: { resetMap: true } }),
    },
    {
      path: "/story",
      label: "이야기",
      icon: "/svgs/bottomTab/storyMenuIcon.svg",
      selectedIcon: "/svgs/bottomTab/selectedStoryMenuIcon.svg",
      onClick: () => navigate("/story"),
    },
    {
      path: "/support",
      label: "지원",
      icon: "/svgs/bottomTab/supportMenuIcon.svg",
      selectedIcon: "/svgs/bottomTab/selectedSupportMenuIcon.svg",
      onClick: () => navigate("/support"),
    },
    {
      path: "/mypage",
      label: "내 프로필",
      icon: "/svgs/bottomTab/profileMenuIcon.svg",
      selectedIcon: "/svgs/bottomTab/selectedProfileMenuIcon.svg",
      onClick: () => navigate("/mypage"),
    },
  ];

  return (
    <div className="w-full max-w-[760px] pt-3 pb-6 px-8 h-21 fixed bottom-0 bg-white flex justify-center items-center">
      <div className="flex justify-between caption1 text-gray-5 gap-9 sm:gap-16 w-full">
        {tabs.map((tab, idx) => (
          <div
            key={idx}
            onClick={tab.onClick}
            className="flex flex-col flex-1 sm:w-20 h-12 justify-center items-center gap-1 cursor-pointer"
          >
            <img
              src={location.pathname === tab.path ? tab.selectedIcon : tab.icon}
              alt={tab.label}
            />
            <span
              className={
                location.pathname === tab.path ? "text-black font-bold" : ""
              }
            >
              {tab.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomTab;
