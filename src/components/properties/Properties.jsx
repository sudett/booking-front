import React from "react";
import { useFetch } from "../../hooks/useFetch";

import "./Properties.css";

const properties = [
  "https://cf.bstatic.com/xdata/images/hotel/square200/215892173.webp?k=6b51dd2628d3a79de9b067446d54109efca1816a867f4ad8ccc7abc75f02803e&o=&s=1",
  "https://cf.bstatic.com/xdata/images/hotel/square200/405447190.webp?k=f767802c5011f184e20e97232b74fed7e5c692b68d2fd17e3cb219d57a4bf1ca&o=&s=1",
  "https://cf.bstatic.com/xdata/images/hotel/square200/113854808.webp?k=bb4a800ffe9a11edac91d18ede1b0c2767c654f291d1f490ed08411abfd31c5f&o=&s=1",
  "https://cf.bstatic.com/xdata/images/hotel/square200/402480311.webp?k=60379bb1b2ead1e030d109550d237ca96ed4517734977decebfdc61cac7fe67c&o=&s=1",
  "https://cf.bstatic.com/xdata/images/hotel/square200/357670492.webp?k=19ceea6aa6590f301df97928d32b40a786be503902a56761b0fc3df250009b3c&o=&s=1",
];

const Properties = () => {
  const { data, loading } = useFetch(
    `https://magnificent-top-hat-bull.cyclic.app/api/hotels/countbytype?types=hotel,apartment,resort,villa,cabin`
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
