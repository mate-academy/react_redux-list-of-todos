import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { todosSlice } from '../features/todos';
import { filterSlice } from '../features/filter';
import { currentTodoSlice } from '../features/currentTodo';
import { loaderSlice } from '../features/loader';
import { activeUserSlice } from '../features/activeUser';

const rootReducer = combineSlices(
  todosSlice,
  filterSlice,
  currentTodoSlice,
  loaderSlice,
  activeUserSlice,
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
