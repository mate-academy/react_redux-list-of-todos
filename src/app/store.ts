import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { filterSlice } from '../features/filter';
import { todosSlice } from '../features/todos';
import { currentTodoSlice } from '../features/currentTodo';
import { userSlice } from '../features/user';

const rootReducer = combineSlices(
  filterSlice,
  todosSlice,
  currentTodoSlice,
  userSlice,
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
