import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { todosSlice } from '../features/todos/todos';
import { filterSlice } from '../features/filter/filter';
import { currentTodoSlice } from '../features/currentTodo/currentTodo';

const rootReducer = combineSlices(todosSlice, filterSlice, currentTodoSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
