import { configureStore } from '@reduxjs/toolkit';
import currentTodo from '../features/currentTodo';
import filterSlice from '../features/filter';
import todosSlice from '../features/todos';

export const store = configureStore({
  reducer: {
    currentTodo: currentTodo,
    filter: filterSlice,
    todos: todosSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
