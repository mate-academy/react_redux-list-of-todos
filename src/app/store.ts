import { combineSlices, configureStore } from '@reduxjs/toolkit';
import currentTodo from '../features/currentTodo';
import todos from '../features/todos';
import filter from '../features/filter';

const rootReducer = combineSlices({
  filter,
  todos,
  currentTodo,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
