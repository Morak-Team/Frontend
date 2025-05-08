import { useGetBestStory } from "@/apis/story/queries";
import BestStoryCarousel from "@/pages/story/components/carousel/BestStoryCarousel";
import CategoryCarousel from "@/pages/story/components/carousel/CategoryCarousel";
import StoryCarousel from "@/pages/story/components/carousel/StoryCarousel";

const StoryPage = () => {
  const { data: bestData, isLoading } = useGetBestStory();

  return (
    <div className="h-[calc(100vh-5.25rem)] overflow-y-auto scrollbar-hide p-5">
      <h1 className="h3 mt-20">많은 응원을 받은 이야기</h1>
      {isLoading && (
        <div className="absolute inset-0 z-50 bg-white bg-opacity-80 flex flex-col justify-center items-center">
          <div className="loader"></div>
          <p className="mt-4 text-gray-500 b5">잠시만 기다려주세요…</p>
        </div>
      )}
      <BestStoryCarousel data={bestData} isLoading={isLoading} />
      <h1 className="h3 mt-10">최근 올라온 스토리</h1>
      <StoryCarousel />
    </div>
  );
};

export default StoryPage;
