import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { todosSlice } from '../features/todos';
import { filterSlice } from '../features/filter';
import { currentTodoSlice } from '../features/currentTodo';

const rootReducer = combineSlices({
  [todosSlice.name]: todosSlice.reducer,
  [filterSlice.name]: filterSlice.reducer,
  [currentTodoSlice.name]: currentTodoSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
