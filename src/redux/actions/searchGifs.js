import {
  CLEAR_SEARCH_GIFS,
  REQUEST_SEARCH_GIFS,
  REQUEST_SEARCH_GIFS_FAILED,
  RECEIVE_SEARCH_GIFS,
  SET_SEARCH_TERM,
} from '../actionTypes';

const requestSearchGifsFailed = () => ({
  type: REQUEST_SEARCH_GIFS_FAILED,
});

const requestSearchGifs = isNewSearch => ({
  type: REQUEST_SEARCH_GIFS,
  isNewSearch,
});

const receiveSearchGifs = ({ data, pagination }, searchTerm) => ({
  type: RECEIVE_SEARCH_GIFS,
  gifs: data,
  pagination,
  searchTerm,
});

export const setSearchTerm = searchTerm => ({
  type: SET_SEARCH_TERM,
  searchTerm,
});

export const clearSearchGifs = () => ({
  type: CLEAR_SEARCH_GIFS,
});

export const searchForGifs = () => (dispatch, getState) => {
  const state = getState();
  const {
    env: { giphyApiHost, giphyApiKey },
    searchGifs: { isNewSearch, searchTerm },
  } = state;
  const encodedSearchTerm = encodeURI(searchTerm);
  let { searchGifs: { offset } } = state;

  if (isNewSearch) {
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
          dispatch(receiveSearchGifs(json));
        }
      },
      () => dispatch(requestSearchGifsFailed()),
    );
};
