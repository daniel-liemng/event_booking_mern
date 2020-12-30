import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
} from "../actionTypes";

const userReducer = (state, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, user_login_loading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, user_login_loading: false, user: action.payload };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        user_login_loading: false,
        user_login_error: action.payload,
      };
    case USER_REGISTER_REQUEST:
      return { ...state, user_register_loading: true };
    case USER_REGISTER_SUCCESS:
      return { ...state, user_register_loading: false, user: action.payload };
    case USER_REGISTER_ERROR:
      return {
        ...state,
        user_register_loading: false,
        user_register_error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
