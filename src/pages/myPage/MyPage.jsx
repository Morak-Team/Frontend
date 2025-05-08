// src/pages/myPage/MyPage.jsx
import { useState } from "react";

const MyPage = () => {
  const [nickname] = useState("권하경");
  const [location] = useState("마포구 서교동");
  const [counts] = useState({ 찜: 3, 리뷰: 12, 응원: 24 });

  return (
    <div className="min-h-screen bg-gray-2 flex flex-col items-center pt-32 relative p-5">
      {/* 카드 */}
      <div className="w-full bg-white rounded-2xl shadow-sm pt-20 pb-6 px-5 flex flex-col items-center relative z-10">
        {/* 수정 아이콘 */}
        <button className="absolute top-4 right-4 opacity-50">
          <img src="/svgs/myPage/edit.svg" alt="edit" className="w-6 h-6" />
        </button>
        {/* 닉네임 & 지역 */}
        <p className="h2">{nickname}</p>
        <p className="b4 text-gray-8 mt-1">{location}</p>

        {/* 구분선 */}
        <div className="w-full bg-gray-3 h-[0.1px] my-4" />

        {/* 찜/리뷰/응원 */}
        <div className="w-full flex justify-around text-center">
          {Object.entries(counts).map(([label, count]) => (
            <div key={label}>
              <p className="text-primary-8 font-bold text-lg">{count}</p>
              <p className="text-sm font-semibold">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 프로필 이미지 (카드 위로 걸치기) */}
      <div className="absolute top-21 z-20">
        <img
          src="/svgs/profile/gray.svg"
          alt="profile"
          className="w-24 h-24 rounded-full border-4 border-white shadow-md"
        />
      </div>

      {/* 로그아웃 버튼 (화면 하단 오른쪽) */}
      <div className="flex justify-end items-end w-full py-2 px-3">
        <button className="b4 text-gray-8 border rounded-md px-4 py-2 bg-white">
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;
