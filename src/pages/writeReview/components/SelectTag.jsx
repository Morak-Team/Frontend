import { useState } from "react";

const SelectTag = ({ onNext }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const tags = [
    { label: "품질이 좋아요", icon: "/svgs/review/tags/meaningful.svg" },
    { label: "친환경적이에요", icon: "/svgs/review/tags/meaningful.svg" },
    { label: "가격이 합리적이에요", icon: "/svgs/review/tags/meaningful.svg" },
    { label: "청결해요", icon: "/svgs/review/tags/meaningful.svg" },
    { label: "다시 방문하고 싶어요", icon: "/svgs/review/tags/meaningful.svg" },
    { label: "의미있는 소비였어요", icon: "/svgs/review/tags/meaningful.svg" },
    {
      label: "우리 지역에 도움이 돼요",
      icon: "/svgs/review/tags/meaningful.svg",
    },
    {
      label: "이웃과 연결된 느낌이에요",
      icon: "/svgs/review/tags/meaningful.svg",
    },
  ];

  const handleTagClick = (tagLabel) => {
    if (selectedTags.includes(tagLabel)) {
      setSelectedTags(selectedTags.filter((t) => t !== tagLabel));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tagLabel]);
    }
  };

  console.log(selectedTags);
  return (
    <div className="relative w-full min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[760px] px-5 pt-14 sm:pt-32 pb-24 overflow-y-auto">
        <div className="flex justify-end">
          <img src="/svgs/review/xIcon.svg" className="w-8 h-8" />
        </div>

        <div className="mt-6 mb-10 text-center">
          <p className="text-xl font-bold">
            <span className="h2 text-orange-500">이 장소</span>
            <span className="h2 text-gray-12">는 어떠셨나요?</span>
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 w-full max-w-[760px]">
          <div className="w-80 bg-gray-100 sm:w-[77%] flex flex-col pt-6 px-7 rounded-md">
            <p className="h4">
              이곳에서의 경험이 <br />
              얼마나 따뜻하게 느껴졌나요?
            </p>
            <p className="b5 text-gray-9 mt-2">
              슬라이드하여 온도를 남겨 보세요.
            </p>
            <div className="flex justify-center items-center flex-col">
              <p className="h1 text-orange-500 text-center mt-6">0도</p>
              <img src="/svgs/review/fire.svg" className="w-52 h-56" />
            </div>
          </div>

          <div className="w-80 bg-gray-100 sm:w-[77%] flex flex-col py-6 px-7 rounded-md">
            <p className="h4">어떤 점이 좋았나요?</p>
            <p className="b5 mt-2 text-gray-9">
              최대 3개까지 선택할 수 있습니다.
            </p>

            <div className="flex flex-col mt-6 gap-2">
              {tags.map((tag) => {
                const isSelected = selectedTags.includes(tag.label);
                return (
                  <button
                    key={tag.label}
                    onClick={() => handleTagClick(tag.label)}
                    className={`flex w-fit shadow-[0px_2px_12px_rgba(46,45,43,0.05)] items-center gap-2 px-3 py-2 rounded-full border transition ${
                      isSelected
                        ? "border-orange-500 bg-[#FFF4EC] border-[1px]"
                        : "border-gray-300 text-gray-12 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <img src={tag.icon} alt="" className="w-5 h-5" />
                    <span className="b5">{tag.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 고정 하단 버튼 */}
      <div className="fixed bottom-0 w-full max-w-[760px] flex justify-center bg-white py-4 shadow-md z-50">
        <button
          onClick={onNext}
          className="w-80 sm:w-[77%] h-12 rounded-md px-6 py-3 text-white bg-orange-500 b1 border border-black"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default SelectTag;
