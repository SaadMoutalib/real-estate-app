import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CHANGE_PASSWORD,
  USERS_LOADED,
  CLEAR_USERS,
  UPDATE_USER,
  DELETE_USER,
} from "../actions/types";
import update from "react-addons-update";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  users: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };
    case USERS_LOADED:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
      };
    case UPDATE_USER:
      return update(state, {
        users: {
          [action.rowIndex]: {
            [action.columnId]: { $set: action.value },
          },
        },
      });
    case REGISTER_SUCCESS:
      return {
        ...state,
        users: state.users.concat(action.payload.user),
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
    case CHANGE_PASSWORD:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
