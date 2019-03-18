import searchGifsReducers from './searchGifs';
import {
  RECEIVE_SEARCH_GIFS,
  REQUEST_SEARCH_GIFS,
  REQUEST_SEARCH_GIFS_FAILED,
} from '../actionTypes';

describe('searchGifsReducers', () => {
  describe('RECEIVE_SEARCH_GIFS', () => {
    it('adds newly received gifs and updates the offset', () => {
      const state = { gifs: [] };
      const action = {
        type: RECEIVE_SEARCH_GIFS,
        gifs: [{ id: 'test-id' }],
        pagination: {
          offset: 8,
          count: 2,
        }
      };

      const newState = searchGifsReducers(state, action);

      expect(newState).toEqual({
        gifs: [{ id: 'test-id' }],
        offset: 11,
        isFetching: false,
        error: null,
      });
    });
  });

  describe('REQUEST_SEARCH_GIFS_FAILED', () => {
    it('adds an error message to the state', () => {
      const state = { gifs: [] };
      const action = { type: REQUEST_SEARCH_GIFS_FAILED };

      const newState = searchGifsReducers(state, action);

      expect(newState).toEqual({
        gifs: [],
        isFetching: false,
        error: 'There was an error fetching gifs. If you really really need them, try reloading the page.',
      });
    });
  });

  describe('REQUEST_SEARCH_GIFS', () => {
    it('informs the state that the user is searching', () => {
      const state = { gifs: [], offset: 20, searchTerm: 'witch' };
      const action = { type: REQUEST_SEARCH_GIFS, searchTerm: 'witch' };

      const newState = searchGifsReducers(state, action);

      expect(newState).toEqual({
        active: true,
        error: null,
        gifs: [],
        isFetching: true,
        offset: 20,
        searchTerm: 'witch',
      });
    });

    describe('when there is a new search term', () => {
      it('resets the offset to 0', () => {
        const state = { gifs: [], offset: 20, searchTerm: 'black cats' };
        const action = { type: REQUEST_SEARCH_GIFS, searchTerm: 'witch' };

        const newState = searchGifsReducers(state, action);

        expect(newState).toEqual({
          active: true,
          error: null,
          gifs: [],
          isFetching: true,
          offset: 0,
          searchTerm: 'witch',
        });
      });
    });
  });
});
