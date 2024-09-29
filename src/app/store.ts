import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../features/filter';
import currentTodoReducer from '../features/currentTodo';
import todosReducer from '../features/todos';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    currentTodo: currentTodoReducer,
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
