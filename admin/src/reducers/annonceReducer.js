import {
  GET_ANNONCES,
  ADD_ANNONCE,
  DELETE_ANNONCE,
  ANNONCES_LOADING,
  GET_ANNONCE,
  CLEAR_ANNONCES,
  UPDATE_ANNONCE,
} from "../actions/types";
import update from "react-addons-update";

const initialState = {
  annonces: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ANNONCES:
      return {
        ...state,
        annonces: action.payload,
        loading: false,
      };
    case GET_ANNONCE:
      return {
        ...state,
        annonces: action.payload,
        loading: false,
      };
    case DELETE_ANNONCE:
      return {
        ...state,
        annonces: state.annonces.filter(
          (annonce) => annonce._id !== action.payload
        ),
      };
    case UPDATE_ANNONCE:
      return update(state, {
        annonces: {
          [action.rowIndex]: {
            [action.columnId]: { $set: action.value },
          },
        },
      });

    case ADD_ANNONCE:
      return {
        ...state,
        annonces: action.payload,
        loading: false,
      };
    case ANNONCES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_ANNONCES:
      return {
        loading: false,
        annonces: [],
      };
    default:
      return state;
  }
}
