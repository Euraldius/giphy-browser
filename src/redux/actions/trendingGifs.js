import {
  RECEIVE_TRENDING_GIFS,
  REQUEST_TRENDING_GIFS,
  REQUEST_TRENDING_GIFS_FAILED,
} from '../actionTypes';

const requestTrendingGifsFailed = () => {
  return {
    type: REQUEST_TRENDING_GIFS_FAILED,
  };
};

const requestTrendingGifs = () => {
  return {
    type: REQUEST_TRENDING_GIFS,
  };
};

const receiveTrendingGifs = ({ data, pagination }) => {
  return {
    type: RECEIVE_TRENDING_GIFS,
    gifs: data,
    pagination,
  };
};

export const fetchTrendingGifs = () => (dispatch, getState) => {
  const state = getState();
  const { env: { giphyApiHost, giphyApiKey } } = state;
  const { trendingGifs: { offset } } = state;
  const trendingGifsURL = `${giphyApiHost}/v1/gifs/trending?apiKey=${giphyApiKey}&offset=${offset}&limit=100`;

  dispatch(requestTrendingGifs());

  return fetch(trendingGifsURL)
    .then(response => response.json().then(json => ({ status: response.status, json })))
    .then(
      ({ status, json }) => {
        if (status >= 400) {
          dispatch(requestTrendingGifsFailed());
        } else {
          dispatch(receiveTrendingGifs(json));
        }
      },
      () => dispatch(requestTrendingGifsFailed()),
    );
};
