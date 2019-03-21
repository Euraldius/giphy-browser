import trendingGifsReducers from './trendingGifs';
import {
  RECEIVE_TRENDING_GIFS,
  REFRESH_TRENDING_GIFS,
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
        error: null,
        gifs: [{ id: 'test-id' }],
        isFetching: false,
        offset: 10,
        refreshing: false,
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
    it('informs the state that the request is in progress', () => {
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

  describe('REFRESH_TRENDING_GIFS', () => {
    it('resets the trending gifs', () => {
      const state = { gifs: [{ id: 'trending' }], refreshing: false };
      const action = { type: REFRESH_TRENDING_GIFS };

      const newState = trendingGifsReducers(state, action);

      expect(newState).toEqual({
        gifs: [],
        refreshing: true,
      });
    });
  });
});
