import { configureStore } from '@reduxjs/toolkit';

import currentTodoReducer from '../features/currentTodo';
import filterReducer from '../features/filter';
import todosReducer from '../features/todos';

// The `store` is passed to the Provider in `/src/index.tsx`
export const store = configureStore({
  reducer: {
    currentTodo: currentTodoReducer,
    filter: filterReducer,
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
