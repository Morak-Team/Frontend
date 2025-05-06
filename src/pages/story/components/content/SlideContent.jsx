import { useNavigate } from "react-router-dom";

const SlideContent = ({ title, img, author, num, likes = 237 }) => {
  const navigate = useNavigate();
  const moveToDetailPage = () => {
    navigate(`/story/${num}`);
  };

  return (
    <div
      className="relative w-full h-64 rounded-xl overflow-hidden cursor-pointer"
      onClick={moveToDetailPage}
    >
      {/* 배경 이미지 */}
      <img src={img} alt={title} className="w-full h-full object-cover" />

      {/* 상단 넘버링 */}
      <div className="absolute top-2 left-2 text-white text-sm font-semibold drop-shadow-sm">
        {num}
      </div>

      {/* 좋아요 + 텍스트 박스 */}
      <div className="absolute bottom-4 left-0 w-full px-4 pt-6 pb-4 text-white">
        {/* 좋아요 아이콘 + 숫자 */}
        <div className="flex items-center gap-1 mb-1">
          <button className="flex gap-1 bg-white text-primary-8 b4 rounded-md px-1 py-0.5 justify-center items-center">
            <img
              src="/svgs/story/storyFireIcon.svg"
              className="w-4 h-4"
              alt="like"
            />
            <span className="text-xs ">{likes}</span>
          </button>
        </div>
        {/* 제목 */}
        <div className="h2 text-white mt-4">{title}</div>
      </div>
    </div>
  );
};

export default SlideContent;
