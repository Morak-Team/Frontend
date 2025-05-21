import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMyProfile, useUpdateProfile } from "@/apis/member/queries";
import ToastModal from "@components/common/ToastModal";
import BackIcon from "/svgs/common/Ic_Arrow_Left.svg";
import { IcWarnning } from "@assets/svgs/modal";

import {
  IcCheck,
  IcNonCheck,
  ImgOrange,
  ImgGray,
  ImgPink,
  ImgBlue,
} from "@assets/svgs/signup";

const profileSvgs = [ImgGray, ImgPink, ImgBlue, ImgOrange];
const profileColors = ["gray", "pink", "blue", "orange"];

const MyPageEdit = () => {
  const navigate = useNavigate();
  const { data } = useMyProfile();
  const { mutate: updateProfile } = useUpdateProfile();

  const [name, setName] = useState("");
  const [location, setAddress] = useState("");
  const [profileColor, setProfileColor] = useState("gray");
  const [toastVisible, setToastVisible] = useState(false);
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isLocationFocused, setIsLocationFocused] = useState(false);
  const [checked, setChecked] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setAddress(data.address || "");
      setProfileColor(data.profileColor || "gray");
      setChecked(data.address === "서울 외 지역 거주");
    }
  }, [data]);

  const handleSubmit = () => {
    if (!name.trim()) {
      setToastVisible(true);
      setToastMessage("이름을 입력해주세요.");
      setTimeout(() => {
        setToastVisible(false);
      }, 1800);
      return;
    }

    const fullLocation = checked
      ? "서울 외 지역 거주"
      : location.trim().startsWith("서울특별시")
        ? location.trim()
        : `서울특별시 ${location.trim()}`;

    updateProfile(
      {
        name,
        location: fullLocation,
        profileColor,
      },
      {
        onSuccess: () => {
          setToastVisible(true);
          setToastMessage("프로필이 저장되었습니다!");
          setTimeout(() => {
            setToastVisible(false);
            navigate("/mypage");
          }, 1500);
        },
        onError: (err) => {
          console.error("프로필 업데이트 실패:", err);
          alert("프로필 업데이트에 실패했습니다.");
        },
      }
    );
  };

  const toggleCheck = () => {
    setChecked((prev) => {
      const next = !prev;
      if (next) setAddress("서울 외 지역 거주");
      else setAddress("");
      return next;
    });
  };

  const trimmed = location.trim();
  const showWarning =
    (!checked && !trimmed.startsWith("서울특별시")) || checked;

  const selectedIndex = profileColors.indexOf(profileColor);
  const SelectedProfile = profileSvgs[selectedIndex] ?? ImgGray;

  return (
    <div className="min-h-screen bg-gray-2 pb-32">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[760px] h-24 pb-4 bg-white z-50 flex items-end justify-between px-4 sm:px-6 border-b">
        <button onClick={() => navigate(-1)} className="w-8 h-8">
          <img src={BackIcon} alt="뒤로가기" className="w-8 h-8" />
        </button>
        <h1 className="h3 text-gray-12">프로필 편집</h1>
        <div className="w-8 h-8" />
      </div>
      <div className="pt-28 max-w-[760px] overflow-x-scroll">
        <div className="flex justify-center mb-6 px-5">
          <div className="w-32 h-32 sm:w-36 sm:h-36">
            <SelectedProfile className="w-full h-full" />
          </div>
        </div>

        <div className="flex w-full gap-3 sm:gap-4 overflow-x-auto justify-center no-scrollbar mb-10">
          {profileSvgs.map((SvgComponent, index) => (
            <div
              key={index}
              className="relative rounded-full cursor-pointer shrink-0"
              onClick={() => setProfileColor(profileColors[index])}
            >
              <SvgComponent className="w-20 h-20 sm:w-24 sm:h-24 rounded-full" />
              {profileColor === profileColors[index] && (
                <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8">
                  <IcCheck className="w-full h-full text-primary-8" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mb-6 px-5">
          <label className="b4 text-gray-8">이름</label>
          <input
            className={`w-full b2 mt-3 rounded-lg p-3 bg-gray-3 text-gray-11 outline-none border-2 transition-colors ${
              isNameFocused || name ? "border-primary-8" : "border-gray-4"
            }`}
            value={name}
            onFocus={() => setIsNameFocused(true)}
            onBlur={() => setIsNameFocused(false)}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-6 px-5">
          <label className="b4 text-gray-8">주소</label>
          <div
            className={`relative w-full mt-3 flex items-center rounded-lg px-3 py-3 border-2 transition-colors bg-gray-3 text-gray-11 ${
              isLocationFocused || trimmed
                ? "border-primary-8"
                : "border-gray-4"
            } ${checked ? "bg-gray-2 cursor-not-allowed" : ""}`}
          >
            <input
              type="text"
              value={checked ? "서울 외 지역 거주" : location}
              onFocus={() => setIsLocationFocused(true)}
              onBlur={() => setIsLocationFocused(false)}
              onChange={(e) => setAddress(e.target.value)}
              readOnly={checked}
              className={`flex-1 bg-transparent outline-none b2 placeholder-gray-6 ${
                checked ? "cursor-not-allowed" : ""
              }`}
            />
          </div>

          {showWarning && (
            <p className="b5 text-primary-8 mt-2">
              현재는 서울에 한해 사회적 기업들을 소개하고 있습니다.
            </p>
          )}

          <button
            onClick={toggleCheck}
            className="flex items-center mt-4 active:opacity-80"
          >
            {checked ? (
              <IcCheck className="w-5 h-5 mr-2 text-primary-8" />
            ) : (
              <IcNonCheck className="w-5 h-5 mr-2 text-gray-6" />
            )}
            <span className={`b5 ${checked ? "text-gray-12" : "text-gray-6"}`}>
              현재 서울에 살고 있지 않습니다.
            </span>
          </button>
        </div>
      </div>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[760px] bg-white px-5 pb-6 pt-4 border-t">
        <button
          onClick={handleSubmit}
          className="w-full h-12 px-4 py-3 bg-primary-8 text-white b1 rounded-xl"
        >
          저장
        </button>
      </div>
      {toastVisible && (
        <ToastModal
          message={toastMessage}
          icon={toastMessage === "이름을 입력해주세요." ? IcWarnning : null}
          duration={1800}
          onClose={() => setToastVisible(false)}
        />
      )}
    </div>
  );
};

export default MyPageEdit;
