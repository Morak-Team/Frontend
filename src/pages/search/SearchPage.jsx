import { useState } from "react";
import SearchBar from "./components/SearchBar";
import RecentSearchList from "./components/RecentSearchList";
import PlaceList from "./components/SearchPlaceList";
import samplePlaces from "@constants/map/socialEnterprise";

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  const handleSearch = (text) => {
    if (!text.trim()) return;

    setKeyword(text);

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

      <PlaceList places={filteredPlaces} onSelect={(p) => alert(p.name)} />

      {keyword.length === 0 && recentSearches.length === 0 && (
        <div className="flex justify-center items-center h-[20rem]">
          <p className="text-center text-zinc-800 font-semibold">
            새로운 가치 가게를 찾아보세요
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
