import {
  ENTER_TRENDING_MODE,
  ENTER_SEARCH_MODE,
  REQUEST_FAILED,
  REQUEST_GIFS,
  RECEIVE_GIFS,
} from '../actionTypes';
import { TRENDING, SEARCHING } from '../../constants';

const initialState = {
  error: null,
  gifs: [],
  isFetching: false,
  mode: TRENDING,
  currentSearch: null,
  resultTotal: null,
};

const enterTrendingMode = state => ({
  ...state,
  gifs: [],
  mode: TRENDING,
  currentSearch: null,
  resultTotal: null,
});

const enterSearchMode = (state, { searchTerm }) => ({
  ...state,
  gifs: [],
  mode: SEARCHING,
  currentSearch: searchTerm,
  resultTotal: null,
});

const requestGifs = state => ({
  ...state,
  error: null,
  isFetching: true,
});

const requestFailed = state => ({
  ...state,
  error: 'There was an error fetching gifs. If you really really need them, try reloading the page.',
  isFetching: false,
});

const receiveGifs = (state, { gifs, pagination: { total_count } }) => ({
  ...state,
  error: null,
  gifs: state.gifs.concat(gifs),
  isFetching: false,
  resultTotal: total_count,
});

const reducers = (state = initialState, action) => {
  switch(action.type) {
    case ENTER_SEARCH_MODE: return enterSearchMode(state, action);
    case ENTER_TRENDING_MODE: return enterTrendingMode(state);
    case RECEIVE_GIFS: return receiveGifs(state, action);
    case REQUEST_FAILED: return requestFailed(state);
    case REQUEST_GIFS: return requestGifs(state);
    default: return state;
  };
};

export default reducers;
