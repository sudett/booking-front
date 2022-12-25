import React, { useEffect } from "react";

import { useGeneralContext } from "../../contexts/general-context/GeneralContext";
import actionTypes from "../../contexts/general-context/ActionTypes";

import SearchBar from "../../components/search-bar/SearchBar";
import Cities from "../../components/cities/Cities";
import Properties from "../../components/properties/Properties";
import FavoriteHomes from "../../components/favorite-homes/FavoriteHomes";

const HomePage = () => {
  const { dispatch } = useGeneralContext();

  useEffect(() => {
    dispatch({ type: actionTypes.SET_PAGE, payload: "home" });
  }, []);

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
