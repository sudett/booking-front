import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useGeneralContext } from "../../contexts/general-context/GeneralContext";

import actionTypes from "../../contexts/general-context/ActionTypes";

import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const { auth, dispatch } = useGeneralContext();

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch({ type: actionTypes.LOGIN_START });

    try {
      const response = await axios.post(
        "http://localhost:8800/api/auth/login",
        {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        }
      );
      dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: response.data });

      navigate("/");
    } catch (err) {
      dispatch({ type: actionTypes.LOGIN_FAILURE, payload: err.response.data });
    }
  };

  console.log(auth);

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
            <span className="error-message">{auth.error.message}</span>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
