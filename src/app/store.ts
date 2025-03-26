import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { filterSlice } from '../features/filter';
import { currentTodoSlice } from '../features/currentTodo';
import { todosSlice } from '../features/todos';
export const rootReducer = combineSlices(
  todosSlice,
  filterSlice,
  currentTodoSlice,
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
