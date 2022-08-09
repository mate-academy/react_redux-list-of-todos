import { combineReducers } from 'redux';
import { todosReducer } from './todosReducer';
import { userReducer } from './userReducer';
import { paginationReducer } from './paginationReducer';

export const rootReducer = combineReducers({
  todos: todosReducer,
  user: userReducer,
  pagination: paginationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
