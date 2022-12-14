import React from "react";

import SearchBar from "../../components/search-bar/SearchBar";
import Cities from "../../components/cities/Cities";
import Properties from "../../components/properties/Properties";
import FavoriteHomes from "../../components/favorite-homes/FavoriteHomes";

const HomePage = () => {
  return (
    <div>
      <SearchBar />
      <Cities />
      <Properties />
      <FavoriteHomes />
    </div>
  );
};

export default HomePage;
