const categories = [
  { name: "카페", icon: "/svgs/categoryBar/Ic_Cafe.svg" },
  { name: "음식점", icon: "/svgs/categoryBar/Ic_Restaurent.svg" },
  { name: "쇼핑", icon: "/svgs/categoryBar/Ic_Shopping.svg" },
  { name: "복합공간", icon: "/svgs/categoryBar/Ic_Community.svg" },
  { name: "문화/예술", icon: "/svgs/categoryBar/Ic_Community.svg" },
  { name: "생활서비스", icon: "/svgs/categoryBar/Ic_Community.svg" },
  { name: "교육/지원", icon: "/svgs/categoryBar/Ic_Community.svg" },
  { name: "IT/디지털", icon: "/svgs/categoryBar/Ic_Community.svg" },
  { name: "제조/운송", icon: "/svgs/categoryBar/Ic_Community.svg" },
  { name: "기타", icon: "/svgs/categoryBar/Ic_Community.svg" },
];

const CategoryBar = ({ onSelect }) => {
  return (
    <div className="absolute top-36 sm:top-44 left-1/2 -translate-x-1/2 w-full max-w-[760px] z-40 px-4 sm:px-0">
      <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide">
        {categories.map((cate) => (
          <button
            key={cate.name}
            onClick={() => onSelect(cate.name)}
            className="flex shrink-0 gap-2 items-center pl-3 pr-5 py-1.5 sm:pl-4 sm:pr-6 rounded-full text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap bg-white shadow"
          >
            <img
              src={cate.icon}
              alt="카테고리 아이콘"
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
            {cate.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
