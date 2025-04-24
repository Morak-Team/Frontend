import useDragScroll from "@/hooks/useDragScroll";

const ReviewContent = ({ item }) => {
  const scrollRef = useDragScroll();

  const tagList = [
    { label: "의미있는 소비였어요", icon: "/svgs/review/tags/meaningful.svg" },
    { label: "친절해요", icon: "/svgs/review/tags/meaningful.svg" },
    { label: "응원하고 싶어요", icon: "/svgs/review/tags/meaningful.svg" },
    {
      label: "우리 지역에 도움이 돼요",
      icon: "/svgs/review/tags/meaningful.svg",
    },
    { label: "가격이 합리적이에요", icon: "/svgs/review/tags/meaningful.svg" },
    { label: "청결해요", icon: "/svgs/review/tags/meaningful.svg" },
    {
      label: "다시 방문하고 싶어요",
      icon: "/svgs/review/tags/meaningful.svg",
    },
  ];

  return (
    <div className="flex flex-col mt-5 mb-5 items-start gap-3 border-b-[1.6px] sm:border-b-[3px] border-gray-3">
      <div className="flex gap-2 justify-center items-center">
        <img src="/svgs/review/profileIcon.svg" className="w-6 h-6" />
        <h1 className="b5 text-gray-12">{item.nickname}</h1>
      </div>
      <p className="b5 text-gray-11">{item.text}</p>
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto scrollbar-hide mb-5 cursor-grab"
      >
        <div className="flex gap-2 w-max">
          {tagList.map((tag, idx) => (
            <div
              key={idx}
              className="flex select-none items-center gap-1 px-3 py-1 bg-gray-1 text-gray-11 rounded-full whitespace-nowrap text-sm"
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
