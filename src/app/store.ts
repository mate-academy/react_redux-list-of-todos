import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { todosSlice } from '../features/todos';
import { currentTodoSlice } from '../features/currentTodo';
import { userSlice } from '../features/currentUser';
import { filterSlice } from '../features/filter';

const rootReducer = combineSlices(
  todosSlice,
  currentTodoSlice,
  userSlice,
  filterSlice,
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
