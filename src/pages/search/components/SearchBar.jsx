import { useNavigate } from "react-router-dom";

const SearchBar = ({ keyword, setKeyword, onSearch, onFocus }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center space-x-2">
      <button onClick={() => navigate(-1)} className="shrink-0">
        <img src="/svgs/common/Ic_Arrow_Left.svg" alt="뒤로가기" className="w-6 h-6" />
      </button>

      <div className="flex-grow h-12 px-4 flex items-center justify-between bg-white rounded-2xl border border-gray-300">
        <input
          type="text"
          value={keyword}
          placeholder="내 주변 가치가게 찾기"
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={onFocus}
          onKeyDown={(e) => e.key === "Enter" && onSearch(keyword)}
          className="flex w-full h-full focus:outline-none"
        />
        <button onClick={() => onSearch(keyword)} className="cursor-pointer">
          <img
            src="/svgs/map/Ic_Search.svg"
            alt="검색 버튼"
            className="w-5 h-5 opacity-80"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
