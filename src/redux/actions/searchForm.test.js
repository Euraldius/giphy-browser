import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setSearchTerm } from './searchForm';
import { SET_SEARCH_TERM } from '../actionTypes';

const mockStore = configureMockStore([thunk]);

describe('setSearchTerm', () => {
  it('sets the search term in the state', () => {
    const store = mockStore({
      searchForm: { searchTerm: 'witch' },
    });

    store.dispatch(setSearchTerm('full moon'))

    expect(store.getActions()).toEqual([
      { type: SET_SEARCH_TERM, searchTerm: 'full moon' },
    ]);
  });
});
