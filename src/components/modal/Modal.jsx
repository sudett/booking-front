import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

import { useState } from "react";

import { useFetch } from "../../hooks/useFetch";

import { useGeneralContext } from "../../contexts/general-context/GeneralContext";

import { AiFillCloseCircle } from "react-icons/ai";

import "./Modal.css";

const Modal = ({ setIsModalOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { dates } = useGeneralContext();
  const navigate = useNavigate();

  const { data, loading } = useFetch(
    `http://localhost:8800/api/hotels/rooms/${hotelId}`
  );

  const getDates = function (startDate, endDate) {
    const date = new Date(startDate.getTime());

    const datesList = [];

    while (date <= endDate) {
      datesList.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return datesList;
  };

  const isAvailable = (roomNum) => {
    const isFound = roomNum.unavailableDates.some((date) =>
      getDates(dates.startDate, dates.endDate).includes(
        new Date(date).getTime()
      )
    );
    return !isFound;
  };

  const selectRoomNumbers = (e) => {
    const { checked, value } = e.target;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((selectedRoomId) => selectedRoomId !== value)
    );
  };

  const handleReserve = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `http://localhost:8800/api/rooms/availability/${roomId}`,
            { dates: getDates(dates.startDate, dates.endDate) }
          );
          return res.data;
        })
      );

      setIsModalOpen(false);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modal__overlay">
      <div className="modal">
        <AiFillCloseCircle
          className="modal__close"
          onClick={() => setIsModalOpen(false)}
        />

        <p>Select your rooms:</p>
        {data?.map((item) => (
          <div className="modal__group" key={item._id}>
            <div className="modal__info">
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
              <p>
                Max people:{" "}
                <span className="modal__max-people">{item.maxPeople}</span>
              </p>
              <p className="modal__price">${item.price}</p>
            </div>

            <div className="modal__rooms">
              {item.roomNumbers.map((roomNum) => (
                <div className="modal__number" key={roomNum._id}>
                  <label>{roomNum.number}</label>
                  <input
                    type="checkbox"
                    value={roomNum._id}
                    onChange={selectRoomNumbers}
                    disabled={!isAvailable(roomNum)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button className="btn modal__btn" onClick={handleReserve}>
          Reserve Now
        </button>
      </div>
    </div>
  );
};

export default Modal;
