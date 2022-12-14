import React from "react";
import { useFetch } from "../../hooks/useFetch";

import "./Properties.css";

const properties = [
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1586611292717-f828b167408c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1575403071235-5dcd06cbf169?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
];

const Properties = () => {
  const { data, loading } = useFetch(
    "http://localhost:8800/api/hotels/countbytype?types=hotel,apartment,resort,villa,cabin"
  );

  return (
    <div className="properties">
      <h2 className="title">Browse by property type</h2>
      <div className="properties__container">
        {loading
          ? "LOADING....."
          : data?.map((item, idx) => (
              <div key={idx}>
                <img
                  className="property__img"
                  src={properties[idx]}
                  alt={item.property}
                />
                <h4>
                  {item.property.replace(
                    item.property[0],
                    item.property[0].toUpperCase()
                  )}
                </h4>
                <h5>
                  {item.quantity} {item.property + "s"}
                </h5>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Properties;
