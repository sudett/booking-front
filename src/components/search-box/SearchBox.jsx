import { useGeneralContext } from "../../contexts/general-context/GeneralContext";

import actionTypes from "../../contexts/general-context/ActionTypes";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./SearchBox.css";

const SearchBox = ({ fetchData }) => {
  const { dates, destination, options, price, dispatch } = useGeneralContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(
      `http://localhost:8800/api/hotels?city=${destination}&min=${price.minPrice}&max=${price.maxPrice}`
    );
  };

  return (
    <form
      className="search-box"
      method="post"
      action=""
      onSubmit={handleSubmit}
    >
      <h3 className="search-box__title">Search</h3>
      <div className="search-box__group">
        <label htmlFor="destination">Destination</label>
        <input
          className="search-box__input"
          type="text"
          id="destination"
          value={destination}
          onChange={(e) =>
            dispatch({
              type: actionTypes.SET_DESTINATION,
              payload: e.target.value,
            })
          }
        />
      </div>

      <div className="search-box__group">
        <label htmlFor="check-in">Check-in date</label>
        <DatePicker
          id="check-in"
          selected={dates.startDate}
          onChange={(date) =>
            dispatch({
              type: actionTypes.SET_DATES,
              payload: { start: date, end: dates.endDate },
            })
          }
        />
      </div>
      <div className="search-box__group">
        <label htmlFor="check-out">Check-out date</label>
        <DatePicker
          id="check-out"
          selected={dates.endDate}
          onChange={(date) =>
            dispatch({
              type: actionTypes.SET_DATES,
              payload: { start: dates.startDate, end: date },
            })
          }
        />
      </div>

      <h5 className="search-box__title">Options</h5>
      <div className="search-box__option-group">
        <label htmlFor="min-price">Min price per night</label>
        <input
          className="search-box__option-input"
          type="number"
          id="min-price"
          min={0}
          value={price.minPrice}
          onChange={(e) =>
            dispatch({
              type: actionTypes.SET_PRICE,
              payload: { item: "minPrice", value: e.target.value },
            })
          }
        />
      </div>
      <div className="search-box__option-group">
        <label htmlFor="max-price">Max price per night</label>
        <input
          className="search-box__option-input"
          type="number"
          id="max-price"
          min={0}
          value={price.maxPrice}
          onChange={(e) =>
            dispatch({
              type: actionTypes.SET_PRICE,
              payload: { item: "maxPrice", value: e.target.value },
            })
          }
        />
      </div>
      <div className="search-box__option-group">
        <label htmlFor="adult">Adult</label>
        <input
          className="search-box__option-input"
          type="number"
          id="adult"
          min={1}
          value={options.adults}
          onChange={(e) =>
            dispatch({
              type: actionTypes.SET_OPTIONS,
              payload: { option: "adults", value: e.target.value },
            })
          }
        />
      </div>
      <div className="search-box__option-group">
        <label htmlFor="children">Children</label>
        <input
          className="search-box__option-input"
          type="number"
          id="children"
          min={0}
          value={options.children}
          onChange={(e) =>
            dispatch({
              type: actionTypes.SET_OPTIONS,
              payload: { option: "children", value: e.target.value },
            })
          }
        />
      </div>
      <div className="search-box__option-group">
        <label htmlFor="room">Room</label>
        <input
          className="search-box__option-input"
          type="number"
          id="room"
          min={1}
          value={options.rooms}
          onChange={(e) =>
            dispatch({
              type: actionTypes.SET_OPTIONS,
              payload: { option: "rooms", value: e.target.value },
            })
          }
        />
      </div>
      <div>
        <button className="btn btn--search-box">Search</button>
      </div>
    </form>
  );
};

export default SearchBox;
