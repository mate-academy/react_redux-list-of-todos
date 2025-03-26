import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos';
import filterReducer from '../features/filter';
import currentTodoSlicefrom from '../features/currentTodo';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    filter: filterReducer,
    current: currentTodoSlicefrom,
  },
});

// 🔹 Типізація RootState
export type RootState = ReturnType<typeof store.getState>;

// 🔹 Типізація AppDispatch
export type AppDispatch = typeof store.dispatch;
