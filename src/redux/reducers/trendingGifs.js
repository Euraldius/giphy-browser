import {
  RECEIVE_TRENDING_GIFS,
  REFRESH_TRENDING_GIFS,
  REQUEST_TRENDING_GIFS,
  REQUEST_TRENDING_GIFS_FAILED,
} from '../actionTypes';

const trendingGifsInitialState = {
  error: null,
  gifs: [],
  isFetching: false,
  offset: 0,
  refreshing: false,
};

const trendingGifsReducers = (state = trendingGifsInitialState, action) => {
  switch(action.type) {
    case RECEIVE_TRENDING_GIFS: {
      const { pagination: { count, offset } } = action;

      return {
        ...state,
        error: null,
        gifs: state.gifs.concat(action.gifs),
        isFetching: false,
        offset: offset + count,
        refreshing: false,
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
    case REFRESH_TRENDING_GIFS: {
      return {
        ...state,
        gifs: [],
        refreshing: true,
      };
    }
    default:
      return state;
  }
};

export default trendingGifsReducers;
