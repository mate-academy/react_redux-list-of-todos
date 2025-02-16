import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos';
import currTodoReducer from '../features/currentTodo';
import filterTodosReducer from '../features/filterSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    currTodo: currTodoReducer,
    filterTodos: filterTodosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
