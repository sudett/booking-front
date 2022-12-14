import React from "react";
import { Link } from "react-router-dom";

import "./Footer.css";

const allInfo = [
  "Countries",
  "Regions",
  "Cities",
  "Districts",
  "Airports",
  "Hotels",
  "Places of interest",
];

const propertyTypes = [
  "Homes",
  "Apartments",
  "Resorts",
  "Villas",
  "Hostels",
  "B&Bs",
  "Guest houses",
];

const specials = [
  "Unique places to stay",
  "All destinations",
  "Discover",
  "Reviews",
  "Unpacked: Travel articles",
  "Travel communities",
  "Seasonal and holiday deals",
];

const services = [
  "Car rental",
  "Flight finder",
  "Restaurant reservations",
  "Booking for Travel Agents",
];

const Footer = () => {
  return (
    <footer>
      <div className="footer__container">
        <div className="footer__top">
          <h2>Save time, save money!</h2>
          <p className="footer__subtitle">
            Sign up and we'll send the best deals to you
          </p>
          <form>
            <input
              className="footer__input"
              type="email"
              name="email"
              placeholder="Your Email"
            />
            <button className="btn btn--footer">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer__bottom">
        <ul>
          {allInfo.map((info, idx) => (
            <li key={idx}>
              <Link className="footer__link" to="/">
                {info}
              </Link>
            </li>
          ))}
        </ul>
        <ul>
          {propertyTypes.map((property, idx) => (
            <li key={idx}>
              <Link className="footer__link" to="/">
                {property}
              </Link>
            </li>
          ))}
        </ul>
        <ul>
          {specials.map((special, idx) => (
            <li key={idx}>
              <Link className="footer__link" to="/">
                {special}
              </Link>
            </li>
          ))}
        </ul>
        <ul>
          {services.map((service, idx) => (
            <li key={idx}>
              <Link className="footer__link" to="/">
                {service}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="footer__copy-right">
        Copyright &copy; 2022 Booking. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
