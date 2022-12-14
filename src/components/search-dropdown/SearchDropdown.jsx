import React from "react";

import { useGeneralContext } from "../../contexts/general-context/GeneralContext";

import actionTypes from "../../contexts/general-context/ActionTypes";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import "./SearchDropdown.css";

const SearchDropdown = () => {
  const { options, dispatch } = useGeneralContext();

  const changeOptions = (option, type) => {
    if (type === "decrease")
      dispatch({
        type: actionTypes.SET_OPTIONS,
        payload: { option, value: +options[option] - 1 },
      });

    if (type === "increase")
      dispatch({
        type: actionTypes.SET_OPTIONS,
        payload: { option, value: +options[option] + 1 },
      });
  };

  return (
    <ul className="drop__list">
      <li className="drop__item">
        <span>Adults</span>
        <div className="drop__btn-container">
          <button
            disabled={options.adults <= 1}
            type="button"
            className="btn--drop btn"
            onClick={() => changeOptions("adults", "decrease")}
          >
            <AiOutlineMinus />
          </button>
          <span>{options.adults}</span>
          <button
            type="button"
            className="btn--drop btn"
            onClick={() => changeOptions("adults", "increase")}
          >
            <AiOutlinePlus />
          </button>
        </div>
      </li>

      <li className="drop__item">
        <span>Children</span>
        <div className="drop__btn-container">
          <button
            disabled={options.children <= 0}
            type="button"
            className="btn--drop btn"
            onClick={() => changeOptions("children", "decrease")}
          >
            <AiOutlineMinus />
          </button>
          <span>{options.children}</span>
          <button
            type="button"
            className="btn--drop btn"
            onClick={() => changeOptions("children", "increase")}
          >
            <AiOutlinePlus />
          </button>
        </div>
      </li>

      <li className="drop__item">
        <span>Rooms</span>
        <div className="drop__btn-container">
          <button
            disabled={options.rooms <= 1}
            type="button"
            className="btn--drop btn"
            onClick={() => changeOptions("rooms", "decrease")}
          >
            <AiOutlineMinus />
          </button>
          <span>{options.rooms}</span>
          <button
            type="button"
            className="btn--drop btn"
            onClick={() => changeOptions("rooms", "increase")}
          >
            <AiOutlinePlus />
          </button>
        </div>
      </li>
    </ul>
  );
};

export default SearchDropdown;
