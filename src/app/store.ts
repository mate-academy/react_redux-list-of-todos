// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos';
import filterReducer from '../features/filter';
import currentTodoReducer from '../features/currentTodo';

// TUTAJ JEST KLUCZ: musi być "export const store"
export const store = configureStore({
  reducer: {
    todos: todosReducer,
    filter: filterReducer,
    currentTodo: currentTodoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
