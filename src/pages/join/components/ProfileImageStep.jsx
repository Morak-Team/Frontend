import { useState } from "react";
import {
  ImgGray,
  ImgPink,
  ImgBlue,
  ImgOrange,
  IcCheck,
} from "@assets/svgs/signup/index";

const profileSvgs = [ImgGray, ImgPink, ImgBlue, ImgOrange];
const profileColors = ["#D6D5D2", "#99958F", "#9BD5FF", "#FFA781"];

const ProfileImageStep = () => {
  const [selected, setSelected] = useState(0);

  const handleConfirm = () => {
    const selectedColor = profileColors[selected];
    localStorage.setItem("signupProfileColor", selectedColor);
    alert("프로필 선택 완료!");
  };

  const SelectedProfile = profileSvgs[selected];

  return (
    <div className="flex flex-col items-center justify-start h-screen pt-24 sm:pt-32 px-6 bg-white relative">
      <h1 className="text-2xl sm:text-4xl font-semibold mb-10 sm:mb-12 text-center">
        프로필사진을 설정해주세요.
      </h1>

      <SelectedProfile className="w-24 h-24 sm:w-32 sm:h-32 mb-10 sm:mb-12" />

      <div className="flex gap-3 sm:gap-4 flex-wrap justify-center">
        {profileSvgs.map((SvgComponent, index) => (
          <div
            key={index}
            className="relative rounded-full cursor-pointer"
            onClick={() => setSelected(index)}
          >
            <SvgComponent className="w-20 h-20 sm:w-24 sm:h-24 rounded-full" />
            {selected === index && (
              <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8">
                <IcCheck className="w-full h-full text-orange-500" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center mt-12 sm:pb-20">
        <button
          onClick={handleConfirm}
          className="w-full max-w-[33.4rem] h-12 px-4 bg-[#FF6F31] mt-64 text-white font-semibold rounded-2xl"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default ProfileImageStep;
