import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUIStore from "@/store/uiStore";
import { useGetBestStoryDetail } from "@/apis/story/queries";
import { usePatchStoryLike } from "@/apis/story/queries";

const StoryDetail = () => {
  const navigate = useNavigate();
  const { storyId } = useParams();
  const { setIsStoryDetail } = useUIStore();
  const { data, isLoading } = useGetBestStoryDetail(storyId);

  useEffect(() => {
    setIsStoryDetail(true);

    return () => setIsStoryDetail(false);
  }, []);

  const { mutate: likeStory } = usePatchStoryLike(storyId);

  const handleLike = () => {
    likeStory(); // 좋아요 요청 및 낙관적 업데이트 실행
  };

  return (
    <div className="flex flex-col p-5 overflow-y-auto scrollbar-hide">
      {isLoading && (
        <div className="absolute inset-0 z-50 bg-white bg-opacity-80 flex flex-col justify-center items-center">
          <div className="loader"></div>
          <p className="mt-4 text-gray-500 b5">잠시만 기다려주세요…</p>
        </div>
      )}
      <img
        src="/svgs/story/backIcon.svg"
        className="w-8 h-8 mt-10"
        onClick={() => navigate(-1)}
      />
      <p className="h2 mt-6">{data?.storyTitle}</p>
      <p className="b4 text-gray-9 mt-3">
        {data?.storyTime &&
          new Date(data?.storyTime).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
      <div className="flex items-center gap-1 mb-7 mt-4">
        <button className="flex gap-1 bg-primary-3 text-primary-8 b4 rounded-xl pl-1 pr-1.5 py-0.5 justify-center items-center">
          <img
            src="/svgs/story/storyFireIcon.svg"
            className="w-4 h-4"
            alt="like"
          />
          <span className="b4">{data?.storyLikes}</span>
        </button>
      </div>

      <img src={data?.imageUrl} className="rounded-lg w-full object-cover" />
      <p className="caption2 text-gray-8 mt-2 ml-4 break-words">
        {data?.source}
      </p>

      <div className="bg-gray-2 rounded-lg w-full mt-10 b2 p-4">
        {data?.storyDetail?.split("\n").map((line, idx) => (
          <p key={idx} className="mb-2 leading-relaxed">
            {line}
          </p>
        ))}
      </div>

      <div className="mt-28 mb-3 text-center">
        <p className="h3">이번 이야기는 어떠셨나요?</p>
        <p className="b4 text-gray-9 mt-3">
          마음에 드셨다면
          <br /> 응원하기를 눌러주세요!
        </p>
      </div>

      <div
        className=" w-full max-w-[760px] flex justify-center bg-white shadow-md z-50 mt-12"
        onClick={handleLike}
      >
        <button className="w-80 sm:w-[80%] bg-primary-8 b5 text-white py-3 rounded-xl flex justify-center items-center gap-2">
          <img src="/svgs/story/whiteFireIcon.svg" className="w-6 h-6" />
          <p className="b1">응원하기</p>
        </button>
      </div>
    </div>
  );
};

export default StoryDetail;
