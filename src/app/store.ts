import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todosReducer from '../features/todos';
import filterReducer from '../features/filter';
import currentTodo from '../features/currentTodo';

const rootReducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer,
  currentTodo: currentTodo,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
