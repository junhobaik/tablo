import { combineReducers } from 'redux';
import tab from './tab';
import app from './app';

const createReducer = () => {
  return combineReducers({
    tab,
    app
  });
}

export default createReducer;
