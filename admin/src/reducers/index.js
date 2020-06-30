import { combineReducers } from "redux";
import annonceReducer from "./annonceReducer";
import errorReducer from "./errorReducer";
import userReducer from "./userReducer";
import adresseReducer from "./adresseReducer";
import favoriteReducer from "./favoriteReducer";

export default combineReducers({
  annonce: annonceReducer,
  error: errorReducer,
  user: userReducer,
  adresse: adresseReducer,
  favoris: favoriteReducer,
});
