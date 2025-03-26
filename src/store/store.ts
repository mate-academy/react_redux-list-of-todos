import { configureStore } from '@reduxjs/toolkit';
import filterSlice from '../features/filter/filterSlice';
import todosSlice from '../features/todos/todosSlice';

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    todos: todosSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
