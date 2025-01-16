// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { todosSlice } from '../features/todos';
import { filterSlice } from '../features/filter';
import { currentTodoSlice } from '../features/currentTodo';

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    filter: filterSlice.reducer,
    currentTodo: currentTodoSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
