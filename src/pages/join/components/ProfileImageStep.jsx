import { useState } from "react";
import IcProfile from "../../../../public/svgs/Ic_Profile.svg?react";
import IcCheck from "../../../../public/svgs/Ic_check.svg?react";

const profileColors = [
  "#D6D5D2", // gray
  "#99958F", // brown
  "#9BD5FF", // blue
  "#FFA781", // orange
];

const ProfileImageStep = () => {
  const [selected, setSelected] = useState(0);

  const handleConfirm = () => {
    const selectedColor = profileColors[selected];
    localStorage.setItem("signupProfileColor", selectedColor);
    alert("프로필 선택 완료!");
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen pt-32 bg-white relative">
      <h1 className="text-4xl font-semibold mb-12">
        프로필사진을 설정해주세요.
      </h1>

      <IcProfile
        style={{ color: profileColors[selected] }}
        className="w-40 h-40 mb-12"
      />

      <div className="flex gap-4">
        {profileColors.map((color, index) => (
          <div
            key={index}
            className="relative rounded-full"
            onClick={() => setSelected(index)}
          >
            <IcProfile style={{ color }} className="w-32 h-32 rounded-full" />
            {selected === index && (
              <div className="absolute top-2 right-2 w-8 h-8">
                <IcCheck className="w-full h-full text-orange-500" />
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleConfirm}
        className="w-full py-4 bg-orange-500 text-white text-lg font-semibold fixed bottom-0 left-0"
      >
        확인
      </button>
    </div>
  );
};

export default ProfileImageStep;
