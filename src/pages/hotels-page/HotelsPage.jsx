import React, { useEffect } from "react";

import { useFetch } from "../../hooks/useFetch";

import { useGeneralContext } from "../../contexts/general-context/GeneralContext";

import actionTypes from "../../contexts/general-context/ActionTypes";

import SearchBox from "../../components/search-box/SearchBox";
import HotelCard from "../../components/hotel-card/HotelCard";

import "./HotelsPage.css";

const hotels = [
  "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1562790351-d273a961e0e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
  "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  "https://images.unsplash.com/photo-1586611292717-f828b167408c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1574643156929-51fa098b0394?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1521783988139-89397d761dce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80",
  "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
];

const HotelsPage = () => {
  const { dispatch, destination, price } = useGeneralContext();

  const { data, loading, fetchData } = useFetch(
    `http://localhost:8800/api/hotels?city=${destination}&min=${price.minPrice}&max=${price.maxPrice}`
  );

  useEffect(() => {
    dispatch({ type: actionTypes.SET_PAGE, payload: "hotels" });
  }, []);

  return (
    <div className="hotels">
      <SearchBox fetchData={fetchData} />
      <ul className="hotels__container">
        {loading
          ? "LOADING"
          : data?.map((item, idx) => (
              <HotelCard img={hotels[idx]} key={item._id} {...item} />
            ))}
      </ul>
    </div>
  );
};

export default HotelsPage;
