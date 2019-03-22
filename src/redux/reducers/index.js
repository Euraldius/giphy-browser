import { combineReducers } from 'redux';
import app from './app';
import env from './env';
import searchForm from './searchForm';

export default combineReducers({ env, app, searchForm });
