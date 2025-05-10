import { configureStore } from '@reduxjs/toolkit';

import currentTodoReducer from '../features/currentTodo';
import filterReducer from '../features/filter';
import todosReducer from '../features/todos';
import { Todo } from '../types/Todo';

export const store = configureStore({
  reducer: {
    currentTodo: currentTodoReducer,
    filter: filterReducer,
    todos: todosReducer,
  },
});

export type RootState = {
  currentTodo: Todo | null;
  filter: {
    query: string;
    status: string;
  };
  todos: Todo[];
};
export type AppDispatch = typeof store.dispatch;
