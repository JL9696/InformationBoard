import axios from 'axios';
import { API_URL } from '../config';

export const getAllAds = ({ ads }) => ads;
export const getAdById = ({ ads }, id)  => ads.find((ad) => ad._id === id);

const createActionName = (actionName) => `app/ads/${actionName}`;
const ADD_AD = createActionName('ADD_AD');
const REMOVE_AD = createActionName('REMOVE_AD');
const UPDATE_ADS = createActionName('UPDATE_ADS');
const EDIT_AD = createActionName('EDIT_AD');
const SEARCH_ADS = createActionName('SEARCH_ADS');

export const addAd = (payload) => ({ type: ADD_AD, payload });
export const removeAd = (payload) => ({ type: REMOVE_AD, payload });
export const updateAds = (payload) => ({ type: UPDATE_ADS, payload });
export const editAd = (payload) => ({ type: EDIT_AD, payload });
export const searchAd = (payload) => ({ type: SEARCH_ADS, payload });

export const fetchAd = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${API_URL}/api/ads`);
  
        dispatch(updateAds(response.data));
      } catch (error) {
        console.log(error); 
      }
    };
  };

  export const fetchData = () => {
    return (dispatch) => {
      fetch(API_URL + '/api/ad')
        .then((res) => res.json())
  
        .then((ads) => dispatch(updateAds(ads)));
    };
  };

  export const fetchAdvertBySearchPhrase = (searchPhrase) => {
    return (dispatch) => {
      fetch(API_URL + 'api/ads/search/' + searchPhrase)
        .then((res) => res.json())
        .then((ads) => dispatch(updateAds(ads)));
    };
  };

const adsReducer = (statePart = [], action) => {
  switch (action.type){
    case ADD_AD:
        return [...statePart, { ...action.payload }];
    case REMOVE_AD:
      return statePart.filter((ad) => ad._id !== action.payload);
    case UPDATE_ADS:
      return [...action.payload];
    case EDIT_AD:
      return statePart.map((ad) => ad.id === action.payload.id ? { ...ad, ...action.payload } : ad);
    default:
      return statePart;
  }
};

export default adsReducer;