import {
  REQUEST_SEARCH_GIFS,
  REQUEST_SEARCH_GIFS_FAILED,
  RECEIVE_SEARCH_GIFS,
} from '../actionTypes';

const requestSearchGifsFailed = () => {
  return {
    type: REQUEST_SEARCH_GIFS_FAILED,
  };
};

const requestSearchGifs = searchTerm => {
  return {
    type: REQUEST_SEARCH_GIFS,
    searchTerm,
  };
};

const receiveSearchGifs = ({ data, pagination }) => {
  return {
    type: RECEIVE_SEARCH_GIFS,
    gifs: data,
    pagination,
  };
};

export const searchForGifs = searchTerm => (dispatch, getState) => {
  const state = getState();
  const { env: { giphyApiHost, giphyApiKey } } = state;
  const { searchGifs: { offset } } = state;
  const searchURL = `${giphyApiHost}/v1/gifs/search?apiKey=${giphyApiKey}&q=${searchTerm}&offset=${offset}`;

  dispatch(requestSearchGifs(searchTerm));

  return fetch(searchURL)
    .then(response => response.json().then(json => ({ status: response.status, json })))
    .then(
      ({ status, json }) => {
        if (status >= 400) {
          dispatch(requestSearchGifsFailed());
        } else {
          dispatch(receiveSearchGifs(json));
        }
      },
      () => dispatch(requestSearchGifsFailed()),
    );
};
