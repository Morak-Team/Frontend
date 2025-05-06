import { useNavigate } from "react-router-dom";

const SlideContent = ({ data, title }) => {
  console.log(data, "slide");
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
        src="/images/1.jpeg"
        alt={title}
        className="w-full h-full object-cover"
      />

      {/* 상단 넘버링 */}
      {/* <div className="absolute top-2 left-2 text-white text-sm font-semibold drop-shadow-sm">
        {num}
      </div> */}
      <img
        src="/svgs/story/moveIcon.svg"
        className="absolute top-5 right-5 w-5 h-5"
      />

      {/* 좋아요 + 텍스트 박스 */}
      <div className="absolute bottom-5 left-0 w-full px-4 pt-6 pb-4 text-white">
        {/* 좋아요 아이콘 + 숫자 */}
        <div className="flex items-center mb-1">
          <button className="flex gap-1 bg-primary-3 text-primary-8 b4 rounded-md pl-1 pr-1.5 py-0.5 justify-center items-center">
            <img
              src="/svgs/story/storyFireIcon.svg"
              className="w-4 h-4"
              alt="like"
            />
            <span className="b4">{data.storyLikes}</span>
          </button>
        </div>
        {/* 제목 */}
        <div className="h3 text-white mt-4">{data.storyTitle}</div>
      </div>
    </div>
  );
};

export default SlideContent;
