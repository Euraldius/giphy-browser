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
      const { searchTerm, pagination: { count, offset, total_count } } = action;
      const isNewSearch = searchTerm !== state.searchTerm;
      const existingGifs = isNewSearch ? [] : state.gifs;

      return {
        ...state,
        error: null,
        gifs: existingGifs.concat(action.gifs),
        isFetching: false,
        offset: offset + count + 1,
        resultTotal: total_count,
        searchTerm,
      };
    }
    case REQUEST_SEARCH_GIFS: {
      const newState = {
        ...state,
        active: true,
        error: null,
        isFetching: true,
      };

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
