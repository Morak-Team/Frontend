import { useNavigate } from "react-router-dom";

const SearchBar = ({ keyword, setKeyword, onSearch, showBottomBorder }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`pt-[6.4rem] px-[1.6rem] pb-[3.1rem] bg-white ${
        showBottomBorder ? "border-b-8 border-gray-50" : ""
      }`}
    >
      <div className="flex items-center space-x-2">
        <button onClick={() => navigate(-1)} className="shrink-0">
          <img
            src="/svgs/Ic_Arrow_left.svg"
            alt="뒤로가기"
            className="w-6 h-6"
          />
        </button>

        <div className="flex-grow h-12 px-4 flex items-center justify-between bg-white rounded-xl border border-gray-300">
          <input
            type="text"
            value={keyword}
            placeholder="내 주변 가치가게 찾기"
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch(keyword)}
            className="flex w-full h-full focus:outline-none"
          />
          <button onClick={() => onSearch(keyword)} className="cursor-pointer">
            <img
              src="/svgs/Ic_Search.svg"
              alt="검색 버튼"
              className="w-5 h-5 opacity-80"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

