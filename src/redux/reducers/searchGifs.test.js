import searchGifsReducers from './searchGifs';
import {
  CLEAR_SEARCH_GIFS,
  RECEIVE_SEARCH_GIFS,
  REQUEST_SEARCH_GIFS,
  REQUEST_SEARCH_GIFS_FAILED,
  SET_SEARCH_TERM,
} from '../actionTypes';

describe('searchGifsReducers', () => {
  describe('CLEAR_SEARCH_GIFS', () => {
    it('resets the search gifs state to default', () => {
      const newState = searchGifsReducers({}, {
        type: CLEAR_SEARCH_GIFS,
      });

      expect(newState).toEqual({
        active: false,
        error: null,
        gifs: [],
        lastSearch: null,
        isFetching: false,
        isNewSearch: true,
        offset: 0,
        searchTerm: '',
      });
    });
  });

  describe('SET_SEARCH_TERM', () => {
    it('sets the search term and whether it is a new search', () => {
      const newState = searchGifsReducers({}, {
        type: SET_SEARCH_TERM,
        searchTerm: 'brimstone',
      });

      expect(newState).toEqual({
        searchTerm: 'brimstone',
      });
    });
  });

  describe('RECEIVE_SEARCH_GIFS', () => {
    it('adds newly received gifs and updates the offset', () => {
      const state = { gifs: [], searchTerm: 'brimstone' };
      const action = {
        type: RECEIVE_SEARCH_GIFS,
        gifs: [{ id: 'test-id' }],
        pagination: {
          count: 2,
          offset: 8,
          total_count: 10,
        },
      };

      const newState = searchGifsReducers(state, action);

      expect(newState).toEqual({
        error: null,
        gifs: [{ id: 'test-id' }],
        isFetching: false,
        lastSearch: 'brimstone',
        offset: 10,
        resultTotal: 10,
        searchTerm: 'brimstone',
      });
    });

    describe('when the user is performing a new search', () => {
      it('removes existing gifs from the state', () => {
        const state = {
          gifs: [{ id: 'old-gif' }],
          isNewSearch: true,
          searchTerm: 'black cat',
        };
        const action = {
          type: RECEIVE_SEARCH_GIFS,
          gifs: [{ id: 'new-gif' }],
          pagination: {
            offset: 8,
            count: 2,
          },
        };

        const newState = searchGifsReducers(state, action);

        expect(newState.gifs.length).toBe(1);
        expect(newState.gifs[0].id).toEqual('new-gif');
        expect(newState.lastSearch).toEqual('black cat');
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
      const state = { gifs: [], offset: 20, lastSearch: null, searchTerm: 'bat' };
      const action = { type: REQUEST_SEARCH_GIFS };

      const newState = searchGifsReducers(state, action);

      expect(newState).toEqual({
        active: true,
        error: null,
        gifs: [],
        isFetching: true,
        isNewSearch: true,
        lastSearch: null,
        offset: 20,
        searchTerm: 'bat',
      });
    });
  });
});
