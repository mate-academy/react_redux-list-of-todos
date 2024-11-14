import { combineSlices, configureStore, Store } from '@reduxjs/toolkit';
import { todosSlice } from '../features/todos';
import { filterSlice } from '../features/filter';
import { currentTodoSlice } from '../features/currentTodo';

const rootReducer = combineSlices({
  todosReducer: todosSlice.reducer,
  filterReducer: filterSlice.reducer,
  currentTodoReducer: currentTodoSlice.reducer,
});

export const store: Store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
