import { GET_ANNONCES, ADD_ANNONCE, DELETE_ANNONCE, ANNONCES_LOADING } from './types';
import axios from 'axios';

export const getAnnonces = () => dispatch => {
    dispatch(setAnnoncesLoading());
    axios
        .get('/api/annonces')
        .then(res => 
            dispatch({
                type : GET_ANNONCES,
                payload : res.data
            })
        )
    return {
        type : GET_ANNONCES
    };
};

export const deleteAnnonces = (id) => {
    return {
        type : DELETE_ANNONCE,
        payload : {
            id
        }
    };
};

export const addAnnonces = (annonce) => {
    return {
        type : ADD_ANNONCE,
        payload : {
            annonce
        }
    };
};

export const setAnnoncesLoading = () =>{
    return {
        type : ANNONCES_LOADING
    }
}