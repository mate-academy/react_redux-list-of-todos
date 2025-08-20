import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { currentTodoSlice } from '../features/currentTodo';
import { filterSlice } from '../features/filter';
import { todosSlice } from '../features/todos';
import { currentUserSlice } from '../features/currentUserSlice';

const rootReducer = combineSlices(
  currentTodoSlice,
  filterSlice,
  todosSlice,
  currentUserSlice,
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
