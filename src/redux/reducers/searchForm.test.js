import reducers from './searchForm';
import { SET_SEARCH_TERM } from '../actionTypes';

describe('SET_SEARCH_TERM', () => {
  it('sets the search term in state', () => {
    const newState = reducers({}, {
      type: SET_SEARCH_TERM,
      searchTerm: 'brimstone',
    });

    expect(newState).toEqual({
      searchTerm: 'brimstone',
    });
  });
});
