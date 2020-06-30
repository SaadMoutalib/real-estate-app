import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD,
  USERS_LOADED,
  UPDATE_USER,
  DELETE_USER,
} from "./types";

import { returnErrors, clearErrors } from "./errorActions";

import axios from "axios";

export const loadUser = () => (dispatch, getState) => {
  const token = getState().user.token;
  if (token) {
    dispatch({ type: USER_LOADING });

    axios
      .get("/api/users/user", tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: AUTH_ERROR,
        });
      });
  }
};

export const deleteUser = (id) => (dispatch, getState) => {
  axios.delete("/api/users/delete/" + id, tokenConfig(getState)).then((res) => {
    dispatch({
      type: DELETE_USER,
      payload: id,
    });
  });
};

export const loadUsers = () => (dispatch, getState) => {
  axios
    .get("/api/users/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USERS_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const tokenConfig = (getState) => {
  const token = getState().user.token;

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

export const register = ({ firstname, lastname, email, password, role }) => (
  dispatch
) => {
  const body = { firstname, lastname, email, password, role };

  axios
    .post("/api/users/", body)
    .then((res) => {
      dispatch(clearErrors());
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

export const changePassword = (newPassword, password, email, id) => (
  dispatch,
  getState
) => {
  const body = { newPassword: newPassword, password: password, email: email };

  axios
    .patch("/api/users/update_password/" + id, body, tokenConfig(getState))
    .then((res) => {
      dispatch(clearErrors());
      dispatch(logout());
      dispatch({
        type: CHANGE_PASSWORD,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "CHANGE_PASSWORD_FAIL"
        )
      );
    });
};

export const updateUser = (rowIndex, columnId, value, idUser) => (
  dispatch,
  getState
) => {
  const body = { [columnId]: value };
  axios
    .patch("/api/users/update/" + idUser, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: UPDATE_USER,
        value: value,
        rowIndex: rowIndex,
        columnId: columnId,
      });
    });
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const login = ({ email, password }) => (dispatch) => {
  dispatch({ type: USER_LOADING });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  axios
    .post("/api/users/login", body, config)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

export const loginAdmin = ({ email, password }) => (dispatch) => {
  dispatch({ type: USER_LOADING });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  axios
    .post("/api/users/admin/login", body, config)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};
