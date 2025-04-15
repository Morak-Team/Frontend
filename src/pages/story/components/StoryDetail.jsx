import { useParams } from "react-router-dom";

const StoryDetail = () => {
  const { storyId } = useParams();
  return (
    <>
      <h1>스토리 디테일 페이지 about {storyId}</h1>
    </>
  );
};

export default StoryDetail;
