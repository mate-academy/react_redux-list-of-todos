import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { filterReducer } from '../features/filter';
import { todoReducer } from '../features/todos';
import { currentTodoReducer } from '../features/currentTodo';

const rootReducer = combineSlices({
  fillters: filterReducer,
  todos: todoReducer,
  currentTodo: currentTodoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
