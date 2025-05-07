import useDragScroll from "@/hooks/useDragScroll";
import { tagList } from "@/constants/review/tagList";

const ReviewContent = ({ item }) => {
  const scrollRef = useDragScroll();

  const matchedTags = tagList.filter((tag) =>
    item.reviewCategories?.includes(tag.value)
  );

  const profileIconSrc = `/svgs/profile/${item.profileColor || "gray"}Profile.svg`;
  return (
    <div className="flex flex-col mt-5 mb-5 items-start gap-3 border-b-[1.6px] sm:border-b-[3px] border-gray-3">
      <div className="flex gap-2 justify-center items-center">
        <img src={profileIconSrc} className="w-6 h-6" />
        <h1 className="b5 text-gray-12">{item.name}</h1>
      </div>

      <div className="flex gap-1 justify-center items-center">
        <img src="/svgs/review/fireIcon.svg" className="w-4 h-4" />
        <p className="b1 text-primary-8">{item?.temperature.toFixed(0)}도</p>
      </div>
      <p className="b5 text-gray-11">{item?.reviewContent}</p>
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto scrollbar-hide mb-5 cursor-grab"
      >
        <div className="flex gap-2 w-max">
          {matchedTags.map((tag, idx) => (
            <div
              key={idx}
              className="flex select-none items-center gap-1 px-1 py-1 bg-gray-1 text-gray-11 rounded-full whitespace-nowrap text-sm"
            >
              <img
                src={tag.icon}
                alt={tag.label}
                className="w-4 h-4"
                draggable={false}
              />
              <p className="caption2 text-gray-11">{tag.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewContent;
