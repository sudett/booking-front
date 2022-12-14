import React from "react";

import { useFetch } from "../../hooks/useFetch";

import "./FavoriteHomes.css";

const favorites = [
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1560185009-5bf9f2849488?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1539922631499-09155cc609a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
];

const FavoriteHomes = () => {
  const { data, loading } = useFetch(
    "http://localhost:8800/api/hotels?featured=true&limit=4&min=100&max=500"
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
