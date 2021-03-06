import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

import reducer from "../reducers/userReducer";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
} from "../actionTypes";

const UserContext = createContext();

const getUserInfoFromLocalStorage = localStorage.getItem("event-userInfo")
  ? JSON.parse(localStorage.getItem("event-userInfo"))
  : null;

const initialState = {
  user: getUserInfoFromLocalStorage,
  user_login_loading: false,
  user_login_error: null,
  user_register_loading: false,
  user_register_error: null,
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const registerUser = async (name, email, password) => {
    // loading
    dispatch({ type: USER_REGISTER_REQUEST });

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/register",
        { name, email, password },
        config
      );

      console.log("aaa", data);
      localStorage.setItem("event-userInfo", JSON.stringify(data));
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    } catch (err) {
      console.log(err.response.data);
      dispatch({
        type: USER_REGISTER_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.response,
      });
    }
  };

  const loginUser = async (email, password) => {
    dispatch({ type: USER_LOGIN_REQUEST });

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );

      console.log("aaa", data);
      localStorage.setItem("event-userInfo", JSON.stringify(data));
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    } catch (err) {
      console.log(err.response.data);
      dispatch({
        type: USER_LOGIN_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.response,
      });
    }
  };

  return (
    <UserContext.Provider value={{ ...state, registerUser, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
