import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos';
import filterReducer from '../features/filter';
import curTodoReducer from '../features/currentTodo';

export const store = configureStore({
  reducer: {
    todosReducer,
    filterReducer,
    curTodoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
