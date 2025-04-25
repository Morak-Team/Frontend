import { useNavigate } from "react-router-dom";
import useUIStore from "@/store/uiStore";

const BottomTab = () => {
  const navigate = useNavigate();
  const { turnOnCamera, isBottomSheetOpen } = useUIStore();

  // BottomSheet 확장 or 카메라 켜짐 상태면 숨김
  if (isBottomSheetOpen || turnOnCamera) return null;

  const tabs = [
    {
      path: "/map",
      label: "지도",
      icon: "/svgs/bottomTab/mapMenuIcon.svg",
      onClick: () => navigate("/map", { state: { resetMap: true } }),
    },
    {
      path: "/story",
      label: "이야기",
      icon: "/svgs/bottomTab/storyMenuIcon.svg",
      onClick: () => navigate("/story"),
    },
    {
      path: "/support",
      label: "지원",
      icon: "/svgs/bottomTab/supportMenuIcon.svg",
      onClick: () => navigate("/support"),
    },
    {
      path: "/mypage",
      label: "내 프로필",
      icon: "/svgs/bottomTab/profileMenuIcon.svg",
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
            <img src={tab.icon} alt={tab.label} />
            <span>{tab.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomTab;
