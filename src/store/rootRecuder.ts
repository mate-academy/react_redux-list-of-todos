import { combineReducers } from 'redux';
import { reducerTodos } from './todos/reducerTodos';

export const rootReducer = combineReducers({
  reducerTodos,
});
