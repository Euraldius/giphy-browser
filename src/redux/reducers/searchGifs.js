import {
  RECEIVE_SEARCH_GIFS,
  REQUEST_SEARCH_GIFS,
  REQUEST_SEARCH_GIFS_FAILED,
} from '../actionTypes';

const searchGifsInitialState = {
  active: false,
  error: null,
  gifs: [],
  isFetching: false,
  offset: 0,
  searchTerm: '',
};

const searchGifsReducers = (state = searchGifsInitialState, action) => {
  switch(action.type) {
    case RECEIVE_SEARCH_GIFS: {
      const { pagination: { count, offset } } = action;

      return {
        ...state,
        gifs: state.gifs.concat(action.gifs),
        offset: offset + count + 1,
        isFetching: false,
        error: null,
      };
    }
    case REQUEST_SEARCH_GIFS: {
      const newState = {
        ...state,
        active: true,
        error: null,
        isFetching: true,
        searchTerm: action.searchTerm,
      };

      if (action.searchTerm !== state.searchTerm) {
        newState.gifs = [];
        newState.offset = 0;
      }

      return newState;
    }
    case REQUEST_SEARCH_GIFS_FAILED: {
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

export default searchGifsReducers;
