import { configureStore } from '@reduxjs/toolkit';

import currentTodoReducer from '../features/currentTodo';
import filterReducer from '../features/filter';
import todosReducer from '../features/todos';

export const store = configureStore({
  reducer: {
    currentTodo: currentTodoReducer,
    filter: filterReducer,
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
