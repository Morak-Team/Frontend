import useDragScroll from "@hooks/useDragScroll";
import {
  businessTypeIconMap,
  businessTypeNameMap,
  reverseBusinessNameMap,
} from "@constants/categoryMap";

const CategoryBar = ({ onSelect }) => {
  const scrollRef = useDragScroll();

  const allCategory = {
    name: "전체",
    icon: businessTypeIconMap["전체"],
  };
  const otherCategories = Object.entries(businessTypeNameMap)
    .filter(([_, ko]) => ko !== "전체")
    .map(([en, ko]) => ({
      name: ko,
      icon: businessTypeIconMap[ko],
    }));
  const categories = [allCategory, ...otherCategories];

  return (
    <div className="absolute top-36 sm:top-44 left-1/2 -translate-x-1/2 w-full max-w-[760px] z-40">
      <div
        className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide"
        ref={scrollRef}
      >
        {categories.map((cate) => (
          <button
            key={cate.name}
            onClick={() => {
              const engValue = reverseBusinessNameMap[cate.name];
              onSelect(engValue);
            }}
            className="flex shrink-0 gap-2 items-center pl-3 pr-5 py-1.5 sm:pl-4 sm:pr-6 rounded-full text-b5 sm:text-b3 font-medium text-gray-12 whitespace-nowrap bg-white shadow cursor-pointer"
          >
            <img
              src={cate.icon}
              alt={`${cate.name} 아이콘`}
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
