import React from "react";
import { useFetch } from "../../hooks/useFetch";

import "./Cities.css";

const cities = [
  "https://images.unsplash.com/photo-1589327934270-659692dd1d28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80",
];

const Cities = () => {
  const { loading, data, errMessage } = useFetch(
    "http://localhost:8800/api/hotels/countbycity?cities=london,paris,madrid"
  );

  return (
    <div className="cities">
      {loading
        ? "LOADING....."
        : data?.map(({ city, quantity }, idx) => (
            <div key={idx} className="cities__group">
              <img className="cities__image" src={cities[idx]} alt={city} />
              <div className="title__container">
                <h2>
                  {city.toLowerCase().replace(city[0], city[0].toUpperCase())}
                </h2>
                <h3>{quantity} properties</h3>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Cities;
