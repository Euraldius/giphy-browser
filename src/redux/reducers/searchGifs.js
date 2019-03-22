import {
  CLEAR_SEARCH_GIFS,
  RECEIVE_SEARCH_GIFS,
  REQUEST_SEARCH_GIFS,
  REQUEST_SEARCH_GIFS_FAILED,
  SET_SEARCH_TERM,
} from '../actionTypes';

const searchGifsInitialState = {
  active: false,
  error: null,
  gifs: [],
  isFetching: false,
  isNewSearch: true,
  lastSearch: null,
  offset: 0,
  searchTerm: '',
};

const searchGifsReducers = (state = searchGifsInitialState, action) => {
  switch(action.type) {
    case RECEIVE_SEARCH_GIFS: {
      const { isNewSearch, searchTerm } = state;
      const { pagination: { count, offset, total_count } } = action;
      const existingGifs = isNewSearch ? [] : state.gifs;

      return {
        ...state,
        error: null,
        gifs: existingGifs.concat(action.gifs),
        isFetching: false,
        lastSearch: searchTerm,
        offset: offset + count,
        resultTotal: total_count,
      };
    }
    case REQUEST_SEARCH_GIFS: {
      const newState = {
        ...state,
        active: true,
        error: null,
        isFetching: true,
        isNewSearch: state.searchTerm !== state.lastSearch,
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
    case CLEAR_SEARCH_GIFS: {
      return searchGifsInitialState;
    }
    case SET_SEARCH_TERM: {
      return {
        ...state,
        searchTerm: action.searchTerm,
      };
    }
    default:
      return state;
  }
};

export default searchGifsReducers;
