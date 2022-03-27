import { combineReducers } from 'redux';
import { todosReducer } from './TodosReducer';
import { userReducer } from './UserReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  todos: todosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
