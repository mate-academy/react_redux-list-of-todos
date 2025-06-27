import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos';
import filterReducer from '../features/filter';
import currentTodoReducer from '../features/currentTodo';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    filter: filterReducer,
    currentTodo: currentTodoReducer,
    // add other slices here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
