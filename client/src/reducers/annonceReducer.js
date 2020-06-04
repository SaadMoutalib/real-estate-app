import { GET_ANNONCES, ADD_ANNONCE, DELETE_ANNONCE } from '../actions/types';

const initialState = {
    annonces : []
}

export default function (state = initialState, action){
    switch(action.type){
        case GET_ANNONCES:
            return {
                ...state
            }
        default:
            return state;
    }
}