import { combineReducers } from 'redux';
import tab from './tab';

const createReducer = () => {
  return combineReducers({
    tab,
  });
};

export default createReducer;
