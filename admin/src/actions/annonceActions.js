import {
  GET_ANNONCES,
  ADD_ANNONCE,
  DELETE_ANNONCE,
  ANNONCES_LOADING,
  GET_ANNONCE,
  CLEAR_ANNONCES,
  ADD_FAVORIS,
  GET_FAVORIS,
  DELETE_FAVORIS,
  UPDATE_ANNONCE,
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

export const updateAnnonce = (rowIndex, columnId, value, idAnnonce) => (
  dispatch,
  getState
) => {
  const body = { [columnId]: value };

  axios
    .patch("/api/annonces/update/" + idAnnonce, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: UPDATE_ANNONCE,
        value: value,
        rowIndex: rowIndex,
        columnId: columnId,
      });
    });
};

export const getAnnoncesFavoris = (iduser) => (dispatch, getState) => {
  dispatch(setAnnoncesLoading());
  axios
    .get("/api/annonces/favoris/" + iduser, tokenConfig(getState))
    .then((res) => {
      var annonces = [];
      res.data.favoris.map(
        (favori, i) => (annonces[i] = favori.annonces_model)
      );
      dispatch({
        type: GET_ANNONCES,
        payload: annonces,
      });
    });
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

export const addFavoris = ({ iduser, idannonce }) => (dispatch, getState) => {
  const body = { iduser, idannonce };
  console.log(body);
  axios
    .post("/api/annonces/addfavoris", body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_FAVORIS,
        payload: idannonce,
      });
    });
};

export const deleteFavoris = ({ iduser, idannonce }) => (
  dispatch,
  getState
) => {
  axios
    .delete(
      "/api/annonces/deletefavoris/" + iduser + "/" + idannonce,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: DELETE_FAVORIS,
        payload: idannonce,
      });
    });
};

export const getFavoris = (iduser) => (dispatch, getState) => {
  axios
    .get("/api/annonces/favoris/" + iduser, tokenConfig(getState))
    .then((res) => {
      const { annoncesModelId } = res.data;

      var ids = [];
      res.data.favoris.map((favori, i) => (ids[i] = favori.annoncesModelId));

      dispatch({
        type: GET_FAVORIS,
        payload: ids,
      });
    });
};

export const getAnnoncesOfUser = (id, query) => (dispatch) => {
  const params = query;
  dispatch(setAnnoncesLoading());
  axios.get("/api/annonces/user/" + id, { params }).then((res) =>
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
