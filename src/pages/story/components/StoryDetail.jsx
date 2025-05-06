import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const StoryDetail = () => {
  const navigate = useNavigate();
  const { storyId } = useParams();
  return (
    <div className="flex flex-col p-5 h-[calc(100vh-5.25rem)] overflow-y-auto scrollbar-hide">
      <img
        src="/svgs/story/backIcon.svg"
        className="w-8 h-8 mt-10"
        onClick={() => navigate(-1)}
      />
      <p className="h2 mt-6">
        이음숲, 숲과 사람을
        <br />
        이어주는 따뜻한 다리
      </p>
      <p className="b4 text-gray-9 mt-3">2021년 5월 21일</p>
      <div className="flex items-center gap-1 mb-7 mt-4">
        <button className="flex gap-1 bg-white text-primary-8 b4 rounded-md px-1 py-0.5 justify-center items-center">
          <img
            src="/svgs/story/storyFireIcon.svg"
            className="w-4 h-4"
            alt="like"
          />
          <span className="b4">234</span>
        </button>
      </div>

      <img src="/images/1.jpeg" className="rounded-lg w-full object-cover" />
      <p className="caption2 text-gray-8 mt-2 ml-4">
        출처: 한국사회적기업진흥원
      </p>

      <div className="bg-gray-2 rounded-lg w-full mt-10 b2 p-4">
        이음숲은 '모두가 숲의 혜택을 누릴 수 있는 세상'을 꿈꾸며 설립된 산림복지
        전문 사회적기업이에요. 단순히 숲 체험을 제공하는 데 그치지 않고, 숲의
        치유적 가치를 지역사회에 자연스럽게 스며들게 하고 있어요. 이음숲은
        '모두가 숲의 혜택을 누릴 수 있는 세상'을 꿈꾸며 설립된 산림복지 전문
        사회적기업이에요. 단순히 숲 체험을 제공하는 데 그치지 않고, 숲의 치유적
        가치를 지역사회에 자연스럽게 스며들게 하고 있어요. 이음숲은 '모두가 숲의
        혜택을 누릴 수 있는 세상'을 꿈꾸며 설립된 산림복지 전문
        사회적기업이에요. 단순히 숲 체험을 제공하는 데 그치지 않고, 숲의 치유적
        가치를 지역사회에 자연스럽게 스며들게 하고 있어요. 이음숲은 '모두가 숲의
        혜택을 누릴 수 있는 세상'을 꿈꾸며 설립된 산림복지 전문
        사회적기업이에요. 단순히 숲 체험을 제공하는 데 그치지 않고, 숲의 치유적
        가치를 지역사회에 자연스럽게 스며들게 하고 있어요.
      </div>

      <div className="mt-28 mb-3 text-center">
        <p className="h3">이번 이야기는 어떠셨나요?</p>
        <p className="b4 text-gray-9 mt-3">
          마음에 드셨다면
          <br /> 응원하기를 눌러주세요!
        </p>
      </div>

      <div className=" w-full max-w-[760px] flex justify-center bg-white shadow-md z-50 mt-12">
        <button className="w-80 sm:w-[80%] bg-primary-8 b5 text-white py-3 rounded-xl flex justify-center items-center gap-2">
          <img src="/svgs/story/whiteFireIcon.svg" className="w-6 h-6" />
          <p className="b1">응원하기</p>
        </button>
      </div>
    </div>
  );
};

export default StoryDetail;
