import BestStoryCarousel from "@/pages/story/components/BestStoryCarousel";
import Category from "@/pages/story/components/Category";

const StoryPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mt-10 ml-10">베스트 스토리</h1>
      <BestStoryCarousel />
      <h1 className="text-3xl font-bold mt-10 ml-10">카테고리별 스토리</h1>
      <Category />
    </>
  );
};

export default StoryPage;
