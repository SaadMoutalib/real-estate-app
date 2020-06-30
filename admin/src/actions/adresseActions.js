import { GET_REGIONS, GET_VILLES, ADRESSES_LOADING } from "./types";
import axios from "axios";

export const getRegions = () => (dispatch) => {
  dispatch(setAdressesLoading());
  axios.get("/api/adresses/regions").then((res) =>
    dispatch({
      type: GET_REGIONS,
      payload: res.data,
    })
  );
};

export const getVillesByRegion = (nomRegion) => (dispatch) => {
  dispatch(setAdressesLoading());
  axios.get("/api/adresses/cities/" + nomRegion).then((res) =>
    dispatch({
      type: GET_VILLES,
      payload: res.data,
    })
  );
};

export const getVilles = () => (dispatch) => {
  dispatch(setAdressesLoading());
  axios.get("/api/adresses/cities").then((res) =>
    dispatch({
      type: GET_VILLES,
      payload: res.data,
    })
  );
};

export const setAdressesLoading = () => {
  return {
    type: ADRESSES_LOADING,
  };
};
