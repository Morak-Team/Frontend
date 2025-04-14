import { useNavigate } from "react-router-dom";

const StoryContent = ({ title, img, num }) => {
  const navigate = useNavigate();
  if (!title || !img) return null;

  const moveToDetailPage = () => {
    navigate(`/story/${num}`);
  };
  return (
    <div
      className="w-[23.8rem] h-[15.8rem] border border-black"
      onClick={moveToDetailPage}
    >
      <img src={img} draggable={false} />
      <h1>{title}</h1>
    </div>
  );
};

export default StoryContent;
