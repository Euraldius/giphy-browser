import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { searchForGifs } from './searchGifs';
import {
  RECEIVE_SEARCH_GIFS,
  REQUEST_SEARCH_GIFS,
  REQUEST_SEARCH_GIFS_FAILED,
} from '../actionTypes';

const mockStore = configureMockStore([thunk]);

describe('searchForGifs', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('searches for gifs matching the search term', () => {
    const gifs = [{ type: 'gif', id: 'test-id', url: 'http://giphy.com/test-id' }];
    fetchMock.get('http://api.giphy.com/v1/gifs/search?apiKey=test-key&q=black%20cats&offset=0&limit=100', {
      body: { data: gifs, pagination: {} },
    });
    const store = mockStore({
      searchGifs: {
        offset: 0,
      },
      env:  {
        giphyApiHost: 'http://api.giphy.com',
        giphyApiKey: 'test-key',
      },
    });

    return store.dispatch(searchForGifs('black cats')).then(() => {
      expect(fetchMock.called()).toBe(true);
      expect(store.getActions()).toEqual([
        { type: REQUEST_SEARCH_GIFS },
        { type: RECEIVE_SEARCH_GIFS, gifs, pagination: {}, searchTerm: 'black cats' }
      ]);
    });
  });

  describe('when there is a new search term', () => {
    it('resets the offset', () => {
      const gifs = [{ type: 'gif', id: 'test-id', url: 'http://giphy.com/test-id' }];
      fetchMock.get('http://api.giphy.com/v1/gifs/search?apiKey=test-key&q=black%20cats&offset=0&limit=100', {
        body: { data: gifs, pagination: {} },
      });
      const store = mockStore({
        searchGifs: {
          offset: 10,
          searchTerm: 'witch',
        },
        env:  {
          giphyApiHost: 'http://api.giphy.com',
          giphyApiKey: 'test-key',
        },
      });

      return store.dispatch(searchForGifs('black cats')).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual([
          { type: REQUEST_SEARCH_GIFS },
          { type: RECEIVE_SEARCH_GIFS, gifs, pagination: {}, searchTerm: 'black cats' }
        ]);
      });
    });
  });

  describe('when the search term matches the term in the state', () => {
    it('uses the offset in the state', () => {
      const gifs = [{ type: 'gif', id: 'test-id', url: 'http://giphy.com/test-id' }];
      fetchMock.get('http://api.giphy.com/v1/gifs/search?apiKey=test-key&q=witch&offset=10&limit=100', {
        body: { data: gifs, pagination: {} },
      });
      const store = mockStore({
        searchGifs: {
          offset: 10,
          searchTerm: 'witch',
        },
        env:  {
          giphyApiHost: 'http://api.giphy.com',
          giphyApiKey: 'test-key',
        },
      });

      return store.dispatch(searchForGifs('witch')).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual([
          { type: REQUEST_SEARCH_GIFS },
          { type: RECEIVE_SEARCH_GIFS, gifs, pagination: {}, searchTerm: 'witch' }
        ]);
      });
    });
  });

  describe('when the request to Giphy can\'t be parsed', () => {
    it('dispatches a failure action', () => {
      fetchMock.get('http://api.giphy.com/v1/gifs/search?apiKey=test-key&q=witch&offset=0&limit=100', 420)
      const store = mockStore({
        searchGifs: {
          offset: 0,
        },
        env:  {
          giphyApiHost: 'http://api.giphy.com',
          giphyApiKey: 'test-key',
        },
      });

      return store.dispatch(searchForGifs('witch')).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual([
          { type: REQUEST_SEARCH_GIFS },
          { type: REQUEST_SEARCH_GIFS_FAILED },
        ]);
      });
    });
  });

  describe('when the request to Giphy fails', () => {
    it('dispatches a failure action', () => {
      fetchMock.get('http://api.giphy.com/v1/gifs/search?apiKey=test-key&q=witch&offset=0&limit=100', {
        status: 420,
        body: {},
      });
      const store = mockStore({
        searchGifs: {
          offset: 0,
        },
        env:  {
          giphyApiHost: 'http://api.giphy.com',
          giphyApiKey: 'test-key',
        },
      });

      return store.dispatch(searchForGifs('witch')).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual([
          { type: REQUEST_SEARCH_GIFS },
          { type: REQUEST_SEARCH_GIFS_FAILED },
        ]);
      });
    });
  });
});
