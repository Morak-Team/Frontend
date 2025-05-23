const RecentSearchList = ({ recentSearches, onSearch, setRecentSearches }) => {
  const handleDelete = (word) => {
    setRecentSearches((prev) => prev.filter((w) => w !== word));
  };

  return (
    <div className="px-[1.9rem] pt-[3.1rem] bg-white divide-y divide-gray-200">
      {recentSearches.map((word, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between py-4 "
          onClick={() => onSearch(word)}
        >
          <div className="flex items-center space-x-2">
            <img
              src="/svgs/map/Ic_Search.svg"
              alt="검색"
              className="w-5 h-5 opacity-30"
            />
            <span className="text-base text-zinc-900">{word}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(word);
            }}
          >
            <img
              src="/svgs/common/Ic_X.svg"
              alt="삭제"
              className="w-4 h-4 opacity-60"
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecentSearchList;
