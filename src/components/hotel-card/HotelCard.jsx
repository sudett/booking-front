import React from "react";

import { useNavigate } from "react-router-dom";

import "./HotelCard.css";

const HotelCard = ({
  img,
  name,
  title,
  city,
  address,
  type,
  photos,
  cheapestPrice,
  distance,
  desc,
  _id,
  rating,
}) => {
  const navigate = useNavigate();

  return (
    <li>
      <div className="hotel">
        <img className="hotel__img" src={photos[0] || img} alt={name} />
        <div className="hotel__info">
          <div className="hotel__info-left">
            <div>
              <h3 className="hotel__title">{title}</h3>
              <p>
                <span className="hotel__location">
                  {address}, {city} .{" "}
                </span>
                <span>{distance} m from center</span>
              </p>

              <span className="hotel__airport-taxi">Free airport taxi</span>
            </div>
            <div>
              <p>{desc}</p>

              <p className="hotel__cancellation">Free cancellation</p>
            </div>
          </div>

          <div className="hotel__info-right">
            {rating && (
              <div className="hotel__detail">
                <div>
                  <span>Very Good</span>
                  <p className="hotel__review">4,267 reviews</p>
                </div>
                <span className="favorite__rate hotel__rate">{rating}</span>
              </div>
            )}
            <div className="hotel__availability">
              <span className="hotel__price">${cheapestPrice}</span>
              <button
                className="btn btn--available"
                onClick={() => navigate(`/hotels/${_id}`)}
              >
                See availability
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default HotelCard;
