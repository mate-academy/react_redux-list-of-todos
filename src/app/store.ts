import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { userSlice } from '../features/user';
import { todosSlice } from '../features/todos';
import { filterSlice } from '../features/filter';
import { loadingSlice } from '../features/loading';
import { currentTodoSlice } from '../features/currentTodo';

const rootReducer = combineSlices(
  currentTodoSlice,
  filterSlice,
  todosSlice,
  userSlice,
  loadingSlice,
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
