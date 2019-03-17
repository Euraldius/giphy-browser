import { combineReducers } from 'redux';
import trendingGifsReducers from './trendingGifs';
import envReducers from './env';

export default combineReducers({
  trendingGifs: trendingGifsReducers,
  env: envReducers,
});
