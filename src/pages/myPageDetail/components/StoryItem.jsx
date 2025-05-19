import { useNavigate } from "react-router-dom";

const StoryItem = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col rounded-md px-3 pt-3 pb-5 bg-white"
      onClick={() => navigate(`/story/${item?.storyId}`)}
    >
      <div className="relative">
        <img
          className="rounded-md w-full h-32 object-cover"
          src={item.imageUrl}
        />

        <div className="absolute bottom-3 left-3">
          <button className="flex gap-1 bg-primary-3 text-primary-8 b4 rounded-lg pl-1 pr-1.5 py-0.5 justify-center items-center">
            <img
              src="/svgs/story/storyFireIcon.svg"
              className="w-4 h-4"
              alt="like"
            />
            <span className="b4">{item?.storyLikes}</span>
          </button>
        </div>
      </div>

      <p className="h4 mt-4">이음숲, 숲과 사람을 이어주는 따뜻한 다리</p>
      <p className="b5 text-gray-9 mt-1">2023년 3월 2일</p>
    </div>
  );
};

export default StoryItem;
