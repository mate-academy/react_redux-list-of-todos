import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { todosReducer } from './todosReducer';

export const rootReducer = combineReducers({
  userReducer,
  todosReducer,
});
