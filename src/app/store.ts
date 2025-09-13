import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../features/filter';
import todosReducer from '../features/todos';
import currentTodoReducer from '../features/currentTodo';
import usersReducer from '../features/user';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    users: usersReducer,
    filter: filterReducer,
    currentTodoSlice: currentTodoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
