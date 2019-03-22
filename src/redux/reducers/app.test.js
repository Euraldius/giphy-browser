import reducers from './app';
import {
  ENTER_TRENDING_MODE,
  ENTER_SEARCH_MODE,
  REQUEST_FAILED,
  REQUEST_GIFS,
  RECEIVE_GIFS,
} from '../actionTypes';
import { TRENDING, SEARCHING } from '../../constants';

describe('REQUEST_FAILED', () => {
  it('adds an error message to the state', () => {
    const action = { type: REQUEST_FAILED };
    const newState = reducers({}, action);

    expect(newState).toEqual({
      isFetching: false,
      error: 'There was an error fetching gifs. If you really really need them, try reloading the page.',
    });
  });
});

describe('RECEIVE_GIFS', () => {
  it('adds newly received gifs to state and sets the total results', () => {
    const state = { gifs: [] };
    const action = {
      type: RECEIVE_GIFS,
      gifs: [{ id: 'test-id' }],
      pagination: {
        total_count: 10,
      },
    };

    const newState = reducers(state, action);

    expect(newState).toEqual({
      error: null,
      gifs: [{ id: 'test-id' }],
      isFetching: false,
      resultTotal: 10,
    });
  });
});

describe('REQUEST_GIFS', () => {
  it('marks that the app is fetching gifs', () => {
    const action = { type: REQUEST_GIFS };
    const newState = reducers({}, action);

    expect(newState).toEqual({ error: null, isFetching: true });
  });
});

describe('ENTER_SEARCH_MODE', () => {
  it('resets gifs for a new search', () => {
    const action = { type: ENTER_SEARCH_MODE, searchTerm: 'witch' };
    const newState = reducers({}, action);

    expect(newState).toEqual({
      currentSearch: 'witch',
      gifs: [],
      mode: SEARCHING,
      resultTotal: null,
    });
  });
});

describe('ENTER_TRENDING_MODE', () => {
  it('resets gifs and existing search term', () => {
    const action = { type: ENTER_TRENDING_MODE };
    const newState = reducers({}, action);

    expect(newState).toEqual({
      currentSearch: null,
      gifs: [],
      mode: TRENDING,
      resultTotal: null,
    });
  });
});
