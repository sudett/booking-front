import React from "react";
import { useFetch } from "../../hooks/useFetch";

import "./Cities.css";

const cities = [
  "https://cf.bstatic.com/xdata/images/city/square250/613095.webp?k=8caf960d96a59e284ac1518ac8777e89d17fda6572acd84dbec151f627c7bf07&o=",
  "https://cf.bstatic.com/xdata/images/xphoto/800x640/140026622.jpg?k=5dddc4cabdbdf1459a8ae377f721bf47976e9ed92a1e9625456aa7faf18637df&o=",
  "https://images.freeimages.com/images/large-previews/0ca/madrid-cathedral-1056659.jpg",
];

const Cities = () => {
  const { loading, data, errMessage } = useFetch(
    `https://magnificent-top-hat-bull.cyclic.app/api/hotels/countbycity?cities=london,paris,madrid`
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
