import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todosSlice';
import usersReducer from '../features/usersSlice';
import filterReducer from '../features/filter';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    users: usersReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
