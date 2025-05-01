import {
  businessTypeIconMap,
  businessTypeNameMap,
  reverseBusinessNameMap,
} from "@/constants/categoryMap";

const categories = Object.entries(businessTypeNameMap).map(([en, ko]) => ({
  name: ko,
  icon: businessTypeIconMap[ko],
}));

const CategoryBar = ({ onSelect }) => {
  return (
    <div className="absolute top-36 sm:top-44 left-1/2 -translate-x-1/2 w-full max-w-[760px] z-40 px-4 sm:px-0">
      <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide">
        {categories.map((cate) => (
          <button
            key={cate.name}
            onClick={() => {
              const engValue = reverseBusinessNameMap[cate.name];
              onSelect(engValue);
            }}
            className="flex shrink-0 gap-2 items-center pl-3 pr-5 py-1.5 sm:pl-4 sm:pr-6 rounded-full text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap bg-white shadow cursor-pointer"
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
