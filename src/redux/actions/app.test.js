import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import { fetchTrendingGifs, searchForGifs, loadMoreGifs } from './app';
import {
  ENTER_SEARCH_MODE,
  ENTER_TRENDING_MODE,
  RECEIVE_GIFS,
  REQUEST_GIFS,
  REQUEST_FAILED,
  SET_SEARCH_TERM,
} from '../actionTypes';
import { SEARCHING, TRENDING } from '../../constants';

const mockStore = configureMockStore([thunk]);

describe('fetchTrendingGifs', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('enters trending mode and fetches trending gifs', () => {
    const gifs = [{ id: 'test-id' }];
    fetchMock.get('http://api.giphy.com/v1/gifs/trending?apiKey=test-key&offset=0&limit=100', {
      body: { data: gifs, pagination: {} },
    });
    const store = mockStore({
      app: { gifs: [], mode: TRENDING },
      env:  {
        giphyApiHost: 'http://api.giphy.com',
        giphyApiKey: 'test-key',
      },
    });

    return store.dispatch(fetchTrendingGifs()).then(() => {
      expect(fetchMock.called()).toBe(true);
      expect(store.getActions()).toEqual([
        { type: ENTER_TRENDING_MODE },
        { type: SET_SEARCH_TERM, searchTerm: '' },
        { type: REQUEST_GIFS },
        { type: RECEIVE_GIFS, gifs, pagination: {} }
      ]);
    });
  });
});

describe('searchForGifs', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('searches for gifs matching the search term', () => {
    const gifs = [{ id: 'test-id' }];
    fetchMock.get('http://api.giphy.com/v1/gifs/search?apiKey=test-key&offset=0&limit=100&q=black%20cats', {
      body: { data: gifs, pagination: {} },
    });
    const store = mockStore({
      app: { currentSearch: 'black cats', gifs: [], mode: SEARCHING, },
      env:  {
        giphyApiHost: 'http://api.giphy.com',
        giphyApiKey: 'test-key',
      },
      searchForm: { searchTerm: 'black cats' },
    });

    return store.dispatch(searchForGifs()).then(() => {
      expect(fetchMock.called()).toBe(true);
      expect(store.getActions()).toEqual([
        { type: ENTER_SEARCH_MODE, searchTerm: 'black cats' },
        { type: SET_SEARCH_TERM, searchTerm: '' },
        { type: REQUEST_GIFS },
        { type: RECEIVE_GIFS, gifs, pagination: {} }
      ]);
    });
  });
});

describe('loadMoreGifs', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('fetches more gifs depending on the current app mode', () => {
    const gifs = [{ id: 'test-id' }];
    fetchMock.get('http://api.giphy.com/v1/gifs/search?apiKey=test-key&offset=0&limit=100&q=black%20cats', {
      body: { data: gifs, pagination: {} },
    });
    const store = mockStore({
      app: { currentSearch: 'black cats', gifs: [], mode: SEARCHING, },
      env:  {
        giphyApiHost: 'http://api.giphy.com',
        giphyApiKey: 'test-key',
      },
    });

    return store.dispatch(loadMoreGifs()).then(() => {
      expect(fetchMock.called()).toBe(true);
      expect(store.getActions()).toEqual([
        { type: REQUEST_GIFS },
        { type: RECEIVE_GIFS, gifs, pagination: {} }
      ]);
    });
  });

  describe('when the request to Giphy can\'t be parsed', () => {
    it('dispatches a failure action', () => {
      fetchMock.get('http://api.giphy.com/v1/gifs/trending?apiKey=test-key&offset=0&limit=100', 420);
      const store = mockStore({
        app: { gifs: [], mode: TRENDING, },
        env:  {
          giphyApiHost: 'http://api.giphy.com',
          giphyApiKey: 'test-key',
        },
      });

      return store.dispatch(loadMoreGifs()).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual([
          { type: REQUEST_GIFS },
          { type: REQUEST_FAILED },
        ]);
      });
    });
  });

  describe('when the request to Giphy fails', () => {
    it('dispatches a failure action', () => {
      fetchMock.get(
        'http://api.giphy.com/v1/gifs/trending?apiKey=test-key&offset=0&limit=100',
        { status: 420, body: {} },
      );
      const store = mockStore({
        app: { gifs: [], mode: TRENDING, },
        env:  {
          giphyApiHost: 'http://api.giphy.com',
          giphyApiKey: 'test-key',
        },
      });

      return store.dispatch(loadMoreGifs()).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual([
          { type: REQUEST_GIFS },
          { type: REQUEST_FAILED },
        ]);
      });
    });
  });
});
