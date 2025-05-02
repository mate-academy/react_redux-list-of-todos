// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todosSlice';
import usersReducer from '../features/usersSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
