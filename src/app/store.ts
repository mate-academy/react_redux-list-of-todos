import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todosSlice';
import filterReducer from '../features/filterSlice';
import currentTodoReducer from '../features/currentTodoSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    filter: filterReducer,
    currentTodo: currentTodoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
