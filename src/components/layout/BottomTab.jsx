import { Link } from "react-router-dom";

const BottomTab = () => {
  return (
    <>
      <div className="w-full max-w-[760px] h-[8.4rem] fixed border-t bottom-0 bg-white">
        <div className="flex w-full pl-[3.2rem] pr-[3.1rem] pt-[1.2rem] justify-between">
          <div className="w-[4.8rem] h-[4.6rem] flex justify-center items-center">
            <Link to="/map">지도</Link>
          </div>
          <div className="w-[4.8rem] h-[4.6rem] flex justify-center items-center">
            <Link to="/story">이야기</Link>
          </div>
          <div className="w-[4.8rem] h-[4.6rem] flex justify-center items-center">
            <Link to="/support">지원</Link>
          </div>
          <div className="w-[4.8rem] h-[4.6rem] flex justify-center items-center">
            <Link to="/myPage">내 프로필</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomTab;
