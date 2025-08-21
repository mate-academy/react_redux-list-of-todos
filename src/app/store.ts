import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { currentTodoSlice } from '../features/currentTodo';
import { todosSlice } from '../features/todos';
import { currentUserSlice } from '../features/currentUser';
import { filterSlice } from '../features/filter';

const rootReducer = combineSlices(
  currentTodoSlice,
  todosSlice,
  currentUserSlice,
  filterSlice,
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
