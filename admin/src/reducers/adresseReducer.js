import { GET_VILLES, GET_REGIONS, ADRESSES_LOADING } from "../actions/types";

const initialState = {
  regions: [],
  villes: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_REGIONS:
      return {
        ...state,
        regions: action.payload,
        loading: false,
      };
    case GET_VILLES:
      return {
        ...state,
        villes: action.payload,
        loading: false,
      };
    case ADRESSES_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
