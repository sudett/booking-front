import React from "react";

import { useFetch } from "../../hooks/useFetch";

import "./FavoriteHomes.css";

const favorites = [
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/314254879.jpg?k=992f817bb542896dfbd547bb4627477965633d86a215c401edf18acdb58a3ef0&o=&hp=1",
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/283811207.jpg?k=5cd846c8c5048875a60993648421e5a2616fade4690546e56d2668c880fa4e35&o=&hp=1",
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/364215508.jpg?k=12b6215ec59895715a477e82b5eba7bfe8b827319c9aa78c119d3ed3b964c38d&o=&hp=1",
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/262919692.jpg?k=3c4065fce5754a6a6f1d0dc3e805b3026c327f9f956e49a8bded505885de31ae&o=&hp=1",
];

const FavoriteHomes = () => {
  const { data, loading } = useFetch(
    // "https://magnificent-top-hat-bull.cyclic.app/api/hotels?featured=true&limit=4&min=100&max=500"
    `https://magnificent-top-hat-bull.cyclic.app/api/hotels?featured=true`
  );

  return (
    <div className="favorites">
      <h2 className="title">Homes guests love</h2>
      <div className="favorites__container">
        {loading
          ? "LOADING"
          : data?.map((item, idx) => (
              <div key={idx}>
                <img
                  className="favorite__img"
                  src={item.photos[0] || favorites[idx]}
                  alt={item.name}
                />
                <h4 className="favorite__title">{item.name}</h4>
                <span className="favorite__location">{item.city}</span>
                <p>Starting from ${item.cheapestPrice}</p>
                {item.rating && (
                  <p>
                    <span className="favorite__rate">{item.rating}</span>
                    <span>Excellent .</span>
                    <span>689 reviews</span>
                  </p>
                )}
              </div>
            ))}
      </div>
    </div>
  );
};

export default FavoriteHomes;
