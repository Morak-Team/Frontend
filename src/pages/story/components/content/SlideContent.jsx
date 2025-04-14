import { useNavigate } from "react-router-dom";

const SlideContent = ({ title, img, author, num }) => {
  const navigate = useNavigate();
  const moveToDetailPage = () => {
    navigate(`/story/${num}`);
  };

  return (
    <div
      className="ml-10 mt-10 flex items-center flex-col"
      onClick={moveToDetailPage}
    >
      <h1>{title}</h1>
      <img src={img} />
      <h3>작가 : {author}</h3>
    </div>
  );
};

export default SlideContent;
