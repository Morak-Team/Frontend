import BestStoryCarousel from "@/pages/story/components/carousel/BestStoryCarousel";
import CategoryCarousel from "@/pages/story/components/carousel/CategoryCarousel";
import StoryCarousel from "@/pages/story/components/carousel/StoryCarousel";

const StoryPage = () => {
  // 카테고리 캐러셀에 넘겨줄 콜백함수를 지정하고 state를 여기서 관리하면 깔끔할 것 같습니당.
  return (
    <div className="pb-[8.4rem] pl-[3rem] pr-[3rem]">
      <h1 className="text-3xl font-bold mt-10 ml-10">베스트 스토리</h1>
      <BestStoryCarousel />
      <h1 className="text-3xl font-bold mt-10 ml-10">카테고리별 스토리</h1>
      <CategoryCarousel />
      <StoryCarousel />
    </div>
  );
};

export default StoryPage;
