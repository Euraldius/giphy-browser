import {
  RECEIVE_TRENDING_GIFS,
  REQUEST_TRENDING_GIFS,
  REQUEST_TRENDING_GIFS_FAILED,
} from '../actionTypes';

const trendingGifsInitialState = {
  gifs: [],
  isFetching: false,
  offset: 0,
  error: null,
};

const trendingGifsReducers = (state = trendingGifsInitialState, action) => {
  switch(action.type) {
    case RECEIVE_TRENDING_GIFS: {
      const { pagination: { count, offset } } = action;

      return {
        ...state,
        gifs: state.gifs.concat(action.gifs),
        offset: offset + count + 1,
        isFetching: false,
        error: null,
      };
    }
    case REQUEST_TRENDING_GIFS: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case REQUEST_TRENDING_GIFS_FAILED: {
      return {
        ...state,
        isFetching: false,
        error: 'There was an error fetching gifs. If you really really need them, try reloading the page.',
      };
    }
    default:
      return state;
  }
};

export default trendingGifsReducers;
