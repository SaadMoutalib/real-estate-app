import { ADD_FAVORIS, GET_FAVORIS, DELETE_FAVORIS } from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case ADD_FAVORIS:
      if (state.some((el) => el === action.payload)) return state;
      return state.concat(action.payload);
    case GET_FAVORIS:
      return state.concat(action.payload);
    case DELETE_FAVORIS:
      return state.filter(function (el, id, arr) {
        return el !== action.payload;
      });
    default:
      return state;
  }
}
