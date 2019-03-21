import searchGifsReducers from './searchGifs';
import {
  CLEAR_SEARCH_GIFS,
  RECEIVE_SEARCH_GIFS,
  REQUEST_SEARCH_GIFS,
  REQUEST_SEARCH_GIFS_FAILED,
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
        isFetching: false,
        isNewSearch: true,
        offset: 0,
        searchTerm: '',
      });
    });
  });

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
        offset: 10,
        isFetching: false,
        error: null,
      });
    });

    describe('when the user is performing a new search', () => {
      it('removes existing gifs from the state', () => {
        const state = { searchTerm: 'witch', gifs: [{ id: 'old-gif' }] };
        const action = {
          type: RECEIVE_SEARCH_GIFS,
          gifs: [{ id: 'new-gif' }],
          pagination: {
            offset: 8,
            count: 2,
          },
          searchTerm: 'black cat',
        };

        const newState = searchGifsReducers(state, action);

        expect(newState.gifs.length).toBe(1);
        expect(newState.gifs[0].id).toEqual('new-gif');
        expect(newState.searchTerm).toEqual('black cat');
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
      const state = { gifs: [], offset: 20, isNewSearch: false };
      const action = { type: REQUEST_SEARCH_GIFS, isNewSearch: true  };

      const newState = searchGifsReducers(state, action);

      expect(newState).toEqual({
        active: true,
        error: null,
        gifs: [],
        isFetching: true,
        isNewSearch: true,
        offset: 20,
      });
    });
  });
});
