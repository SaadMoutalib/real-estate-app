import {
  GET_ANNONCES,
  ADD_ANNONCE,
  DELETE_ANNONCE,
  ANNONCES_LOADING,
  GET_ANNONCE,
  CLEAR_ANNONCES,
} from "./types";
import axios from "axios";
import { tokenConfig } from "./userActions";

export const getAnnonces = (query) => (dispatch) => {
  const params = query;

  dispatch(setAnnoncesLoading());
  axios.get("/api/annonces", { params }).then((res) =>
    dispatch({
      type: GET_ANNONCES,
      payload: res.data,
    })
  );
};

export const clearAnnonces = () => {
  return {
    type: CLEAR_ANNONCES,
  };
};

export const getAnnonce = (id) => (dispatch) => {
  dispatch(setAnnoncesLoading());
  axios.get("/api/annonces/" + id).then((res) =>
    dispatch({
      type: GET_ANNONCE,
      payload: res.data,
    })
  );
};

export const getAnnoncesOfUser = (id) => (dispatch) => {
  dispatch(setAnnoncesLoading());
  axios.get("/api/annonces/user/" + id).then((res) =>
    dispatch({
      type: GET_ANNONCES,
      payload: res.data,
    })
  );
};

export const deleteAnnonce = (id) => (dispatch, getState) => {
  axios
    .delete("/api/annonces/delete/" + id, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_ANNONCE,
        payload: id,
      });
    });
  return {
    type: DELETE_ANNONCE,
    payload: id,
  };
};

export const addAnnonces = (data) => (dispatch, getState) => {
  const {
    adresse,
    ville,
    titre,
    surface,
    nbrChambres,
    nbrSallesDeBain,
    nbrPieces,
    prix,
    tel,
    type,
    etat,
    description,
    userid,
    fonctionalite,
    pictures,
  } = data;

  const adr = {
    adresse,
    ville,
  };

  let annonce = {
    titre,
    prix,
    tel,
    surface,
    nbrChambres,
    nbrSallesDeBain,
    nbrPieces,
    description,
    type,
    etat,
    userid,
  };
  dispatch(setAnnoncesLoading());
  return axios
    .all([
      axios.post("/api/adresses/", adr, tokenConfig(getState)),
      axios.post(
        "/api/annonces/fonctionalite/",
        fonctionalite,
        tokenConfig(getState)
      ),
    ])
    .then((resArr) => {
      annonce.idadresse = resArr[0].data.id;
      annonce.idfonctionalite = resArr[1].data.id;
      axios
        .post("/api/annonces/", annonce, tokenConfig(getState))
        .then((res) => {
          dispatch({
            type: ADD_ANNONCE,
            payload: res.data,
          });
          var formData = new FormData();
          formData.append("idannonce", res.data.annonce._id);
          for (var i = 0; i < pictures["files"].length; i++) {
            formData.append("pictures", pictures.files[i]);
          }
          axios.post(
            "/api/annonces/upload-images",
            formData,
            tokenConfig(getState)
          );
        });
    });
};

export const setAnnoncesLoading = () => {
  return {
    type: ANNONCES_LOADING,
  };
};
