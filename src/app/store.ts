// store.ts
import { configureStore, combineSlices } from '@reduxjs/toolkit';
import { currentTodoSlice } from '../features/currentTodo';
import { filterSlice } from '../features/filter';
import { todosSlice } from '../features/todos';
const rootReducer = combineSlices(todosSlice, filterSlice, currentTodoSlice);

export const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
