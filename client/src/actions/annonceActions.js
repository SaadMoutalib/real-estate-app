import { GET_ANNONCES, ADD_ANNONCE, DELETE_ANNONCE } from './actions/types';

export const getAnnonces = () => {
    return {
        type : GET_ANNONCES
    };
};