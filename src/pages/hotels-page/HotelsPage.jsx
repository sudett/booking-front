import React, { useEffect } from "react";

import { useFetch } from "../../hooks/useFetch";

import { useGeneralContext } from "../../contexts/general-context/GeneralContext";

import actionTypes from "../../contexts/general-context/ActionTypes";

import SearchBox from "../../components/search-box/SearchBox";
import HotelCard from "../../components/hotel-card/HotelCard";

import "./HotelsPage.css";

const hotels = [
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/338199296.jpg?k=9933902c149628c08b9d9ada3693ebff0a3b4075b4645cc3150f6ffec7b7efcf&o=&hp=1",
  "https://cf.bstatic.com/xdata/images/hotel/square200/295883745.webp?k=611d9e71d1e370b9a7a77533a9faa8025d91ca1b02b182e2d6d269edcda26745&o=&s=1",
  "https://cf.bstatic.com/xdata/images/hotel/square200/339642091.webp?k=5c5967b566f15f6169c26bbd52ad6de11e7ff408217f3e6ab9cbee2b7d5a67c1&o=&s=1",
  "https://cf.bstatic.com/xdata/images/hotel/square200/234129794.webp?k=c1029e8d700a1b8b7c022c2a0f9afa2cb030e8efa25b3e54ce96447e5ae4a7f3&o=&s=1",
  "https://cf.bstatic.com/xdata/images/hotel/square200/265791985.webp?k=cfa1b4e3c7b7fa6009a89740e5f57f66d30e257260eda9d9542bd3d191e527a5&o=&s=1",
  "https://cf.bstatic.com/xdata/images/hotel/square200/325910293.webp?k=97f0cc3a85d84715be93a7fe52d1cff328258fc2fb466b49739079c1a3c1b072&o=&s=1",
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/246584140.jpg?k=fe3919434390c2e63eb56db1892e197aaa44b3be208a4c96090ffcfd99c32b7c&o=&hp=1",
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/246596022.jpg?k=89f1177e7813ed3974794a688f20d7c88b729f14061e4a76f662a9896e73c04e&o=&hp=1",
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/246583444.jpg?k=8eaa8634ea92fd1d3ae24d1a301834fcf3652baa5908a8498d4e0790f7a2dc8e&o=&hp=1",
];

const HotelsPage = () => {
  const { dispatch, destination, price } = useGeneralContext();

  const { data, loading, fetchData } = useFetch(
    `https://magnificent-top-hat-bull.cyclic.app/api/hotels?city=${destination}&min=${price.minPrice}&max=${price.maxPrice}`
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
