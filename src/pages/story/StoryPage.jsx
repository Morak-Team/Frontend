import { useGetBestStory } from "@/apis/story/queries";
import BestStoryCarousel from "@/pages/story/components/carousel/BestStoryCarousel";
import CategoryCarousel from "@/pages/story/components/carousel/CategoryCarousel";
import StoryCarousel from "@/pages/story/components/carousel/StoryCarousel";

const StoryPage = () => {
  const { data, isLoading } = useGetBestStory();
  console.log(data);
  // 카테고리 캐러셀에 넘겨줄 콜백함수를 지정하고 state를 여기서 관리하면 깔끔할 것 같습니당.
  return (
    <div className="h-[calc(100vh-5.25rem)] overflow-y-auto scrollbar-hide p-5">
      <h1 className="h3 mt-10">많은 응원을 받은 이야기</h1>
      <BestStoryCarousel />
      <h1 className="h3 mt-10">최근 올라온 스토리</h1>
      <CategoryCarousel />
      <StoryCarousel />
    </div>
  );
};

export default StoryPage;
