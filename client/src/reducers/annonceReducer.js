import { GET_ANNONCES, ADD_ANNONCE, DELETE_ANNONCE, ANNONCES_LOADING } from '../actions/types';

const initialState = {
    annonces : [],
    loading : false
}

export default function (state = initialState, action){
    switch(action.type){
        case GET_ANNONCES:
            return {
                ...state,
                annonces : action.payload,
                loading : false
            };
        case DELETE_ANNONCE :
            return {
                ...state,
                //delete annonce code
            };
        case ADD_ANNONCE :
            return{
                ...state,
                //add annonce code
            };
        case ANNONCES_LOADING :
            return{
                ...state,
                loading : true
            };
        default:
            return state;
    }
}