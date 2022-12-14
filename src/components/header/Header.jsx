import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useGeneralContext } from "../../contexts/general-context/GeneralContext";

import actionTypes from "../../contexts/general-context/ActionTypes";

import { FaBed, FaCar, FaTaxi } from "react-icons/fa";
import { MdOutlineFlight, MdOutlineAttractions } from "react-icons/md";

import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const { page, auth, dispatch } = useGeneralContext();

  return (
    <div className="container">
      <header className={`${page === "home" && "header--main"} header`}>
        <div className="header__top">
          <ul className="header__list">
            <li className="header__item">
              <Link className="header__link header__link--active" to="/">
                <FaBed className="icon" />
                <span>Stays</span>
              </Link>
            </li>
            <li className="header__item">
              <Link className="header__link" to="/">
                <MdOutlineFlight className="icon" />
                <span>Flights</span>
              </Link>
            </li>
            <li className="header__item">
              <Link className="header__link" to="/">
                <FaCar className="icon" />
                <span>Car rentals</span>
              </Link>
            </li>
            <li className="header__item">
              <Link className="header__link" to="/">
                <MdOutlineAttractions className="icon" />
                <span>Attractions</span>
              </Link>
            </li>
            <li className="header__item">
              <Link className="header__link" to="/">
                <FaTaxi className="icon" />
                <span>Airport taxis</span>
              </Link>
            </li>
          </ul>
          {!auth.user ? (
            <div className="btns__container">
              <button className="btn btn--login">Register</button>
              <button
                className="btn btn--login"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          ) : (
            <div className="btns__container">
              <span>{auth.user.username}</span>
              <button
                className="btn btn--logout"
                onClick={() => dispatch({ type: actionTypes.LOGOUT })}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {page === "home" && (
          <div>
            <h1 className="header__title">Find your next stay</h1>
            <p>Search deals on hotels, homes, and much more...</p>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
