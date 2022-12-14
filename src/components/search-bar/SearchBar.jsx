import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useGeneralContext } from "../../contexts/general-context/GeneralContext";
import actionTypes from "../../contexts/general-context/ActionTypes";

import SearchDropdown from "../search-dropdown/SearchDropdown";

import { FaRegCalendarAlt } from "react-icons/fa";
import {
  RiEarthLine,
  RiArrowDropDownLine,
  RiArrowDropUpLine,
} from "react-icons/ri";
import { IoMdMan } from "react-icons/io";

import "./SearchBar.css";

const SearchBar = () => {
  const { dates, options, destination, dispatch } = useGeneralContext();
  const [isOpenOptions, setIsOpenOptions] = useState(false);

  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    navigate("/hotels");
  };

  return (
    <form className="search" onSubmit={searchHandler}>
      <div className="search__group">
        <RiEarthLine className="icon search__icon" />
        <input
          type="search"
          className="search__location"
          id="location"
          placeholder="Where are you going? London, Madrid, Paris..."
          value={destination}
          onChange={(e) =>
            dispatch({
              type: actionTypes.SET_DESTINATION,
              payload: e.target.value,
            })
          }
        />
      </div>

      <div className="search__group">
        <FaRegCalendarAlt className="icon search__icon" />
        <DatePicker
          selected={dates.startDate}
          startDate={dates.startDate}
          endDate={dates.endDate}
          onChange={(dates) => {
            const [start, end] = dates;
            dispatch({ type: actionTypes.SET_DATES, payload: { start, end } });
          }}
          selectsRange
          monthsShown={2}
          minDate={new Date()}
          closeOnScroll={true}
        />
      </div>

      <div className="search__group">
        <div
          className="search__group-container"
          onClick={() => setIsOpenOptions((prev) => !prev)}
        >
          <IoMdMan className="icon search__icon" />
          <p>
            {options.adults} adults . {options.children} children .{" "}
            {options.rooms} room
          </p>
          {isOpenOptions && <RiArrowDropDownLine className="search__arrow" />}
          {!isOpenOptions && <RiArrowDropUpLine className="search__arrow" />}
        </div>
        {isOpenOptions && <SearchDropdown />}
      </div>
      <button className="btn btn--search" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
