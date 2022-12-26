import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import { useGeneralContext } from "../../contexts/general-context/GeneralContext";

import actionTypes from "../../contexts/general-context/ActionTypes";

import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [showError, setShowError] = useState(false);

  const hotelId = state && state.hotelId;

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const { auth, dispatch } = useGeneralContext();

  useEffect(() => {
    dispatch({ type: actionTypes.SET_PAGE, payload: "login" });
  }, []);

  const handleError = () => {
    setShowError(true);

    setTimeout(() => {
      setShowError(false);
    }, 3000);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch({ type: actionTypes.LOGIN_START });

    try {
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;

      if (!username || !password)
        throw new Error("Please fill in username and password correctly");

      const response = await axios.post(
        `https://magnificent-top-hat-bull.cyclic.app/api/auth/login`,
        {
          username,
          password,
        }
      );

      dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: response.data });
      dispatch({
        type: actionTypes.SET_PAGE,
        payload: hotelId ? "single-hotel" : "home",
      });

      navigate(`${hotelId ? `/hotels/${hotelId}` : "/"}`);
    } catch (err) {
      dispatch({
        type: actionTypes.LOGIN_FAILURE,
        payload: err.response?.data || err.message,
      });

      handleError();
    }
  };

  return (
    <div className="login__image">
      <div className="login__overlay">
        <form className="login__form" onSubmit={submitHandler}>
          <div className="login__group">
            <label className="login__label" htmlFor="username">
              Username
            </label>
            <input
              className="login__input"
              type="text"
              id="username"
              ref={usernameRef}
            />
          </div>
          <div className="login__group">
            <label className="login__label" htmlFor="password">
              Password
            </label>
            <input
              className="login__input"
              type="password"
              id="password"
              ref={passwordRef}
            />
          </div>
          <button className="btn login__btn" disabled={auth.isFetching}>
            Login
          </button>

          {auth.error && (
            <span className={`${showError && "show-error"} error-message`}>
              {auth.error}
            </span>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
