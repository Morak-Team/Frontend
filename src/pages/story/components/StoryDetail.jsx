import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useUIStore from "@/store/uiStore";
import { useGetBestStoryDetail } from "@/apis/story/queries";
import { usePatchStoryLike } from "@/apis/story/queries";
import HaveToLoginModal from "@components/common/HaveToLoginModal";
import ToastModal from "@/components/common/ToastModal";

const StoryDetail = () => {
  const navigate = useNavigate();
  const { storyId } = useParams();
  const { setIsStoryDetail } = useUIStore();
  const { data, isLoading } = useGetBestStoryDetail(storyId);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setIsStoryDetail(true);

    return () => setIsStoryDetail(false);
  }, []);

  const { mutate: likeStory } = usePatchStoryLike(storyId);

  const handleLike = () => {
    likeStory(undefined, {
      onSuccess: () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      },
      onError: (error) => {
        const status = error?.response?.status;

        if (status === 401) {
          setErrorModal({
            open: true,
            message: "로그인이 필요합니다.",
            subMessage: "응원 기능은 로그인 후 이용할 수 있어요!",
          });
        } else if (status === 400) {
          setErrorModal({
            open: true,
            message: "이미 응원하신 스토리입니다.",
            subMessage: "아쉽지만 한 번만 응원할 수 있어요",
          });
        } else {
          setErrorModal({
            open: true,
            message: "응원 요청 실패",
            subMessage: "잠시 후 다시 시도해주세요.",
          });
        }
      },
    });
  };

  // 모달 상태 구조
  const [errorModal, setErrorModal] = useState({
    open: false,
    message: "",
    subMessage: "",
  });

  return (
    <div className="flex flex-col p-5 overflow-y-auto scrollbar-hide">
      {isLoading && (
        <div className="absolute inset-0 z-50 bg-white bg-opacity-80 flex flex-col justify-center items-center">
          <div className="loader"></div>
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

      {showToast && (
        <ToastModal
          message="응원이 모락모락, 사회적 가치를 더해갑니다!"
          onClose={() => setShowToast(false)}
        />
      )}

      {errorModal.open && (
        <HaveToLoginModal
          message={errorModal.message}
          subMessage={errorModal.subMessage}
          onClose={() => setErrorModal({ ...errorModal, open: false })}
          showButton={errorModal.message === "로그인이 필요합니다."}
        />
      )}
    </div>
  );
};

export default StoryDetail;
