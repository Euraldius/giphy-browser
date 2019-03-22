import { SET_SEARCH_TERM } from '../actionTypes';

const initialState = {
  searchTerm: '',
};

const reducers = (state = initialState, action) => {
  switch(action.type) {
    case SET_SEARCH_TERM: {
      return {
        ...state,
        searchTerm: action.searchTerm,
      };
    }
    default: return state;
  };
};

export default reducers;
