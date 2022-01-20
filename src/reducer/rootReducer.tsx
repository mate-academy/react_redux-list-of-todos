import { combineReducers } from 'redux';
import { todosReducer } from './todosReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
  todosReducer,
  userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
