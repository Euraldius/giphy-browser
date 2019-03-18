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

  it('searches for trending gifs', () => {
    const gifs = [{ type: 'gif', id: 'test-id', url: 'http://giphy.com/test-id' }];
    fetchMock.get('http://api.giphy.com/v1/gifs/search?apiKey=test-key&q=witch&offset=0', {
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

    return store.dispatch(searchForGifs('witch')).then(() => {
      expect(fetchMock.called()).toBe(true);
      expect(store.getActions()).toEqual([
        { type: REQUEST_SEARCH_GIFS, searchTerm: 'witch' },
        { type: RECEIVE_SEARCH_GIFS, gifs, pagination: {} }
      ]);
    });
  });

  describe('when the request to Giphy can\'t be parsed', () => {
    it('dispatches a failure action', () => {
      fetchMock.get('http://api.giphy.com/v1/gifs/search?apiKey=test-key&q=witch&offset=0', 420)
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
          { type: REQUEST_SEARCH_GIFS, searchTerm: 'witch' },
          { type: REQUEST_SEARCH_GIFS_FAILED },
        ]);
      });
    });
  });

  describe('when the request to Giphy fails', () => {
    it('dispatches a failure action', () => {
      fetchMock.get('http://api.giphy.com/v1/gifs/search?apiKey=test-key&q=witch&offset=0', {
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
          { type: REQUEST_SEARCH_GIFS, searchTerm: 'witch' },
          { type: REQUEST_SEARCH_GIFS_FAILED },
        ]);
      });
    });
  });
});
