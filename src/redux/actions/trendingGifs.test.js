import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { fetchTrendingGifs, showTrendingGifs } from './trendingGifs';
import {
  CLEAR_SEARCH_GIFS,
  RECEIVE_TRENDING_GIFS,
  REFRESH_TRENDING_GIFS,
  REQUEST_TRENDING_GIFS,
  REQUEST_TRENDING_GIFS_FAILED,
} from '../actionTypes';

const mockStore = configureMockStore([thunk]);

describe('showTrendingGifs', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('clears searched gifs and refreshes the trending gifs', () => {
    const gifs = [{ type: 'gif', id: 'test-id', url: 'http://giphy.com/test-id' }];
    fetchMock.get('http://api.giphy.com/v1/gifs/trending?apiKey=test-key&offset=0&limit=100', {
      body: { data: gifs, pagination: {} },
    });
    const store = mockStore({
      trendingGifs: {
        offset: 0,
      },
      env:  {
        giphyApiHost: 'http://api.giphy.com',
        giphyApiKey: 'test-key',
      },
    });

    return store.dispatch(showTrendingGifs()).then(() => {
      expect(fetchMock.called()).toBe(true);
      expect(store.getActions()).toEqual([
        { type: CLEAR_SEARCH_GIFS },
        { type: REFRESH_TRENDING_GIFS },
        { type: REQUEST_TRENDING_GIFS },
        { type: RECEIVE_TRENDING_GIFS, gifs, pagination: {} }
      ]);
    });
  });
});

describe('fetchTrendingGifs', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('fetches trending gifs', () => {
    const gifs = [{ type: 'gif', id: 'test-id', url: 'http://giphy.com/test-id' }];
    fetchMock.get('http://api.giphy.com/v1/gifs/trending?apiKey=test-key&offset=0&limit=100', {
      body: { data: gifs, pagination: {} },
    });
    const store = mockStore({
      trendingGifs: {
        offset: 0,
      },
      env:  {
        giphyApiHost: 'http://api.giphy.com',
        giphyApiKey: 'test-key',
      },
    });

    return store.dispatch(fetchTrendingGifs()).then(() => {
      expect(fetchMock.called()).toBe(true);
      expect(store.getActions()).toEqual([
        { type: REQUEST_TRENDING_GIFS },
        { type: RECEIVE_TRENDING_GIFS, gifs, pagination: {} }
      ]);
    });
  });

  describe('when the request to Giphy can\'t be parsed', () => {
    it('dispatches a failure action', () => {
      fetchMock.get('http://api.giphy.com/v1/gifs/trending?apiKey=test-key&offset=0&limit=100', 420);
      const store = mockStore({
        trendingGifs: {
          offset: 0,
        },
        env:  {
          giphyApiHost: 'http://api.giphy.com',
          giphyApiKey: 'test-key',
        },
      });

      return store.dispatch(fetchTrendingGifs()).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual([
          { type: REQUEST_TRENDING_GIFS },
          { type: REQUEST_TRENDING_GIFS_FAILED },
        ]);
      });
    });
  });

  describe('when the request to Giphy fails', () => {
    it('dispatches a failure action', () => {
      fetchMock.get('http://api.giphy.com/v1/gifs/trending?apiKey=test-key&offset=0&limit=100', {
        status: 420,
        body: {},
      });
      const store = mockStore({
        trendingGifs: {
          offset: 0,
        },
        env:  {
          giphyApiHost: 'http://api.giphy.com',
          giphyApiKey: 'test-key',
        },
      });

      return store.dispatch(fetchTrendingGifs()).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual([
          { type: REQUEST_TRENDING_GIFS },
          { type: REQUEST_TRENDING_GIFS_FAILED },
        ]);
      });
    });
  });
});
