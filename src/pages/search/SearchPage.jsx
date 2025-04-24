import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import RecentSearchList from "./components/RecentSearchList";
import PlaceList from "./components/SearchPlaceList";
import samplePlaces from "@constants/map/socialEnterprise";
import { getDistanceFromLatLon } from "../map/utils/getDistanceFromLatLon";
import { formatDistance } from "../map/utils/formatDistance";

const LOCAL_STORAGE_KEY = "recentSearches";

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [userCoords, setUserCoords] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    if (keyword.trim() === "") {
      setIsSearched(false);
      setFilteredPlaces([]);
    }
  }, [keyword]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.error("위치 정보를 가져올 수 없습니다:", err);
      }
    );
  }, []);

  const handleSearch = (text) => {
    if (!text.trim()) return;
    setKeyword(text);
    setIsSearched(true);

    const updated = [text, ...recentSearches.filter((w) => w !== text)];
    setRecentSearches(updated.slice(0, 5));

    const result = samplePlaces
      .map((place) => {
        const searchText = text.toLowerCase();
        const match =
          place.name.toLowerCase().includes(searchText) ||
          place.category.toLowerCase().includes(searchText);

        if (!match) return null;

        const distance = userCoords
          ? getDistanceFromLatLon(
              userCoords.lat,
              userCoords.lng,
              place.coords.lat,
              place.coords.lng
            )
          : null;

        return {
          ...place,
          distance,
          formattedDistance:
            distance !== null ? formatDistance(distance) : null,
        };
      })
      .filter(Boolean)
      .sort((a, b) => {
        if (a.distance == null || b.distance == null) return 0;
        return a.distance - b.distance;
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
