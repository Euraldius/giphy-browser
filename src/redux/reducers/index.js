import { combineReducers } from 'redux';
import trendingGifsReducers from './trendingGifs';
import searchGifsReducers from './searchGifs';
import envReducers from './env';

export default combineReducers({
  trendingGifs: trendingGifsReducers,
  searchGifs: searchGifsReducers,
  env: envReducers,
});
