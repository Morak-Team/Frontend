import { useNavigate } from "react-router-dom";

const SlideContent = ({ data, title }) => {
  const navigate = useNavigate();
  const moveToDetailPage = () => {
    navigate(`/story/${data.storyId}`);
  };

  return (
    <div
      className="relative w-full h-64 rounded-xl overflow-hidden cursor-pointer"
      onClick={moveToDetailPage}
    >
      {/* 배경 이미지 */}
      <img
        src={data?.imageUrl}
        alt={title}
        className="w-full h-full object-cover"
      />

      <img
        src="/svgs/story/moveIcon.svg"
        className="absolute top-5 right-5 w-5 h-5"
      />

      <div className="absolute bottom-5 left-0 w-full px-4 pt-6 pb-4 text-white">
        {/* 좋아요 아이콘 + 숫자 */}
        <div className="flex items-center mb-1">
          <button className="flex gap-1 bg-primary-3 text-primary-8 b4 rounded-lg  pl-1 pr-1.5 py-0.5 justify-center items-center">
            <img
              src="/svgs/story/storyFireIcon.svg"
              className="w-4 h-4"
              alt="like"
            />
            <span className="b4">{data.storyLikes}</span>
          </button>
        </div>
        {/* 제목 */}
        <div className="h3 font-semibold text-white mt-2 break-keep">
          {data.storyTitle}
        </div>
      </div>
    </div>
  );
};

export default SlideContent;
