import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecentStories } from "@apis/story/getRecentStories";

const StoryCarousel = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await getRecentStories(10);
        setStories(data);
      } catch (err) {
        console.error("최근 스토리 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) {
    return <p className="text-gray-500 mt-4">스토리를 불러오는 중입니다…</p>;
  }

  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-hide mt-4 px-1">
      {stories.map((story) => (
        <div
          key={story.storyId}
          onClick={() => navigate(`/story/${story.storyId}`)}
          className="relative w-[15.9375rem] sm:w-[17rem] md:w-[18rem] aspect-[255/182] flex-shrink-0 rounded-[0.5rem] overflow-hidden cursor-pointer"
        >
          <img
            src={story.imageUrl}
            alt={story.storyTitle}
            className="absolute w-full h-full object-cover"
          />

          <img
            src="/svgs/story/moveIcon.svg"
            alt="이동 아이콘"
            className="absolute top-5 right-5 w-5 h-5"
          />

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col gap-2">
            <div className="flex items-center gap-1 bg-primary-3 rounded-lg w-fit px-1.5 py-0.5">
              <img
                src="/svgs/story/storyFireIcon.svg"
                alt="fire"
                className="w-4 h-4"
              />
              <span className="text-caption2 text-primary-8 font-semibold">
                {story.likes || 0}
              </span>
            </div>

            <h2 className="text-white font-semibold text-h4 break-keep">
              {story.storyTitle}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoryCarousel;
