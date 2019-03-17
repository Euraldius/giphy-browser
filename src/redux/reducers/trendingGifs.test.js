import trendingGifsReducers from './trendingGifs';
import {
  RECEIVE_TRENDING_GIFS,
  REQUEST_TRENDING_GIFS,
  REQUEST_TRENDING_GIFS_FAILED,
} from '../actionTypes';

describe('trendingGifsReducers', () => {
  describe('RECEIVE_TRENDING_GIFS', () => {
    it('adds newly received gifs and updates the offset', () => {
      const state = { gifs: [] };
      const action = {
        type: RECEIVE_TRENDING_GIFS,
        gifs: [{ id: 'test-id' }],
        pagination: {
          offset: 8,
          count: 2,
        }
      };

      const newState = trendingGifsReducers(state, action);

      expect(newState).toEqual({
        gifs: [{ id: 'test-id' }],
        offset: 11,
        isFetching: false,
        error: null,
      });
    });
  });

  describe('REQUEST_TRENDING_GIFS_FAILED', () => {
    it('adds an error message to the state', () => {
      const state = { gifs: [] };
      const action = { type: REQUEST_TRENDING_GIFS_FAILED };

      const newState = trendingGifsReducers(state, action);

      expect(newState).toEqual({
        gifs: [],
        isFetching: false,
        error: 'There was an error fetching gifs. If you really really need them, try reloading the page.',
      });
    });
  });

  describe('REQUEST_TRENDING_GIFS', () => {
    it('informs that the state the request is in progress', () => {
      const state = { gifs: [] };
      const action = { type: REQUEST_TRENDING_GIFS };

      const newState = trendingGifsReducers(state, action);

      expect(newState).toEqual({
        gifs: [],
        isFetching: true,
        error: null,
      });
    });
  });
});
