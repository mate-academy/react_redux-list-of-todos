import { combineSlices, configureStore, Store } from '@reduxjs/toolkit';
import { todosSlice } from '../features/todos';
import { currentTodoSlice } from '../features/currentTodo';
import { filterSlice } from '../features/filter';

const rootReducer = combineSlices(todosSlice, currentTodoSlice, filterSlice);

export const store: Store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
