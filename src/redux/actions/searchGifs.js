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

const requestSearchGifs = () => {
  return {
    type: REQUEST_SEARCH_GIFS,
  };
};

const receiveSearchGifs = ({ data, pagination }, searchTerm) => {
  return {
    type: RECEIVE_SEARCH_GIFS,
    gifs: data,
    pagination,
    searchTerm,
  };
};

export const searchForGifs = newSearchTerm => (dispatch, getState) => {
  const state = getState();
  const {
    env: { giphyApiHost, giphyApiKey },
    searchGifs: { searchTerm },
  } = state;
  const encodedSearchTerm = encodeURI(newSearchTerm);
  let { searchGifs: { offset } } = state;

  if (newSearchTerm !== searchTerm) {
    offset = 0;
  }

  const searchURL = `${giphyApiHost}/v1/gifs/search?` +
                    `apiKey=${giphyApiKey}&` +
                    `q=${encodedSearchTerm}&` +
                    `offset=${offset}&limit=100`;

  dispatch(requestSearchGifs());

  return fetch(searchURL)
    .then(response => response.json().then(json => ({ status: response.status, json })))
    .then(
      ({ status, json }) => {
        if (status >= 400) {
          dispatch(requestSearchGifsFailed());
        } else {
          dispatch(receiveSearchGifs(json, newSearchTerm));
        }
      },
      () => dispatch(requestSearchGifsFailed()),
    );
};
