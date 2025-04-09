import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import RecentSearchList from "./components/RecentSearchList";
import PlaceList from "./components/SearchPlaceList";
import samplePlaces from "@constants/map/socialEnterprise";

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  // 입력값이 지워지면 검색 상태 초기화
  useEffect(() => {
    if (keyword.trim() === "") {
      setIsSearched(false);
      setFilteredPlaces([]);
    }
  }, [keyword]);

  const handleSearch = (text) => {
    if (!text.trim()) return;
    setKeyword(text);
    setIsSearched(true);

    const updated = [text, ...recentSearches.filter((w) => w !== text)];
    setRecentSearches(updated.slice(0, 5));

    const result = samplePlaces.filter(
      (place) => place.name.includes(text) || place.category.includes(text)
    );
    setFilteredPlaces(result);
  };

  return (
    <div className="bg-white min-h-screen pb-36">
      <SearchBar
        keyword={keyword}
        setKeyword={setKeyword}
        onSearch={handleSearch}
      />

      {keyword.length === 0 && recentSearches.length > 0 && (
        <RecentSearchList
          recentSearches={recentSearches}
          onSearch={handleSearch}
          setRecentSearches={setRecentSearches}
        />
      )}

      <PlaceList
        places={filteredPlaces}
        onSelect={(p) => alert(p.name)}
        showEmptyMessage={isSearched}
      />
    </div>
  );
};

export default SearchPage;
