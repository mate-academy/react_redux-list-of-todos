import { combineReducers } from 'redux';
import { loadReducer } from './loadReducer';
import { todosReducer } from './todoReducer';
import { queryReducer } from './queryReducer';

export const reducer = combineReducers({
  loadReducer,
  queryReducer,
  todosReducer,
});
