import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGetRecentStory } from "@/apis/story/queries";
import useDragScroll from "@/hooks/useDragScroll";

const StoryCarousel = () => {
  const navigate = useNavigate();
  const scrollRef = useDragScroll();
  const isDragging = useRef(false);

  const { data: stories = [], isLoading } = useGetRecentStory();

  const handleMouseDown = () => {
    isDragging.current = false;
  };

  const handleMouseMove = () => {
    isDragging.current = true;
  };

  const handleClick = (storyId) => {
    if (!isDragging.current) {
      navigate(`/story/${storyId}`);
    }
  };

  if (isLoading) {
    return <p className="text-gray-500 mt-4">스토리를 불러오는 중입니다…</p>;
  }

  return (
    <div
      ref={scrollRef}
      className="flex gap-4 overflow-x-auto scrollbar-hide select-none mt-4 px-1 cursor-grab"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      {stories.map((story) => (
        <div
          key={story.storyId}
          onClick={() => handleClick(story.storyId)}
          onDragStart={(e) => e.preventDefault()}
          className="relative w-64 sm:w-72 md:w-80 aspect-[255/182] flex-shrink-0 rounded-md overflow-hidden cursor-pointer"
        >
          <img
            src={story.imageUrl}
            alt={story.storyTitle}
            className="absolute w-full h-full object-cover pointer-events-none"
          />

          <img
            src="/svgs/story/moveIcon.svg"
            alt="이동 아이콘"
            className="absolute top-5 right-5 w-5 h-5 pointer-events-none"
          />

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col gap-2 pointer-events-none">
            <div className="flex items-center gap-1 bg-primary-3 rounded-lg w-fit px-1.5 py-0.5">
              <img
                src="/svgs/story/storyFireIcon.svg"
                alt="fire"
                className="w-4 h-4"
              />
              <span className="caption2 text-primary-8">
                {story.storyLikes || 0}
              </span>
            </div>
            <h2 className="text-white h4 break-keep">{story.storyTitle}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoryCarousel;
