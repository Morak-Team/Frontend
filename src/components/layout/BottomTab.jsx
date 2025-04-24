import { Link } from "react-router-dom";

const BottomTab = () => {
  const tabs = [
    { path: "/map", label: "지도", icon: "/svgs/bottomTab/mapMenuIcon.svg" },
    {
      path: "/story",
      label: "이야기",
      icon: "/svgs/bottomTab/storyMenuIcon.svg",
    },
    {
      path: "/support",
      label: "지원",
      icon: "/svgs/bottomTab/supportMenuIcon.svg",
    },
    {
      path: "/mypage",
      label: "내 프로필",
      icon: "/svgs/bottomTab/profileMenuIcon.svg",
    },
  ];

  return (
    <div className="w-full max-w-[760px] pt-3 pb-6 px-8 h-21 fixed bottom-0 bg-white flex justify-center items-center">
      <div className="flex justify-between caption1 text-gray-5 gap-9 sm:gap-16 w-full">
        {tabs.map((tab, idx) => (
          <Link
            key={idx}
            to={tab.path}
            className="flex flex-col flex-1 sm:w-20 h-12 justify-center items-center gap-1"
          >
            <img src={tab.icon} alt={tab.label} />
            <span>{tab.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomTab;
