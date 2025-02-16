import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos';
import currentTodoReducer from '../features/currentTodo';
import filterReducer from '../features/filter';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    currentTodo: currentTodoReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
