import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import RecentSearchList from "./components/RecentSearchList";
import PlaceList from "./components/SearchPlaceList";
import samplePlaces from "@constants/map/socialEnterprise";

const LOCAL_STORAGE_KEY = "recentSearches";

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  // localStorage에서 최근 검색어 불러오기
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // 최근 검색어 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recentSearches));
  }, [recentSearches]);

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

    const result = samplePlaces.filter((place) => {
      const searchText = text.toLowerCase();
      return (
        place.name.toLowerCase().includes(searchText) ||
        place.category.toLowerCase().includes(searchText)
      );
    });

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
