/* eslint-disable */
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import currentTodoReducer from '../features/currentTodo';
import filterReducer from '../features/filter';
import todoReducer from '../features/todos';

const rootReducer = combineSlices({
  currentTodo: currentTodoReducer,
  todos: todoReducer,
  filter: filterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
