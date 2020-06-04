import { combineReducers } from 'redux';
import annonceReducer from './annonceReducer';

export default combineReducers({
    annonce: annonceReducer
});