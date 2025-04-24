const categories = [
  { name: "카페", icon: "/svgs/Ic_Cafe.svg" },
  { name: "음식점", icon: "/svgs/Ic_Restaurent.svg" },
  { name: "쇼핑", icon: "/svgs/Ic_Shopping.svg" },
  { name: "복합공간", icon: "/svgs/Ic_Community.svg" },
  { name: "문화/예술", icon: "/svgs/Ic_Community.svg" },
  { name: "생활서비스", icon: "/svgs/Ic_Community.svg" },
  { name: "교육/지원", icon: "/svgs/Ic_Community.svg" },
  { name: "IT/디지털", icon: "/svgs/Ic_Community.svg" },
  { name: "제조/운송", icon: "/svgs/Ic_Community.svg" },
  { name: "기타", icon: "/svgs/Ic_Community.svg" },
];

const CategoryBar = ({ onSelect }) => {
  return (
    <div className="absolute top-44 left-16 right-0 z-40 ">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {categories.map((cate) => (
          <button
            key={cate.name}
            onClick={() => onSelect(cate.name)}
            className="flex shrink-0 gap-2 items-center pl-4 pr-6 py-1.5 rounded-full text-sm font-medium text-gray-900 whitespace-nowrap  bg-white shadow"
          >
            <img src={cate.icon} alt="카테고리 아이콘" className="w-8 h-8" />
            {cate.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
