import {
  ENTER_SEARCH_MODE,
  ENTER_TRENDING_MODE,
  RECEIVE_GIFS,
  REQUEST_FAILED,
  REQUEST_GIFS,
} from '../actionTypes';
import { SEARCHING } from '../../constants';
import { setSearchTerm } from './searchForm';

const enterTrendingMode = () => ({
  type: ENTER_TRENDING_MODE,
});

const enterSearchMode = searchTerm => ({
  type: ENTER_SEARCH_MODE,
  searchTerm,
});

const requestFailed = () => ({
  type: REQUEST_FAILED,
});

const requestGifs = () => ({
  type: REQUEST_GIFS,
});

const receiveGifs = ({ data, pagination }) => ({
  type: RECEIVE_GIFS,
  gifs: data,
  pagination,
});

const fetchGifs = (dispatch, getState) => {
  const {
    env: { giphyApiHost, giphyApiKey },
    app: { gifs, currentSearch, mode },
  } = getState();
  const offset = gifs.length;
  const apiPath = mode === SEARCHING ? 'search' : 'trending';
  const query = mode === SEARCHING ? `&q=${currentSearch}` : '';
  const url = `${giphyApiHost}/v1/gifs/${apiPath}?apiKey=${giphyApiKey}&offset=${offset}&limit=100${query}`;

  dispatch(requestGifs());

  return fetch(url)
    .then(response => response.json().then(json => ({ status: response.status, json })))
    .then(
      ({ status, json }) => {
        if (status >= 400) {
          dispatch(requestFailed());
        } else {
          dispatch(receiveGifs(json));
        }
      },
      () => dispatch(requestFailed()),
    );
};

export const fetchTrendingGifs = () => (dispatch, getState) => {
  dispatch(enterTrendingMode());
  dispatch(setSearchTerm(''));

  return fetchGifs(dispatch, getState);
};

export const searchForGifs = () => (dispatch, getState) => {
  const { searchForm: { searchTerm } } = getState();

  dispatch(enterSearchMode(searchTerm));
  dispatch(setSearchTerm(''));

  return fetchGifs(dispatch, getState);
};

export const loadMoreGifs = () => (dispatch, getState) => {
  return fetchGifs(dispatch, getState);
};
