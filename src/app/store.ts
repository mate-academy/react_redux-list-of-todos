import { configureStore } from '@reduxjs/toolkit';
import currentTodoSlice from '../features/currentTodo';
import todosSlice from '../features/todos';
import filterSlice from '../features/filter';

export const store = configureStore({
  reducer: {
    todos: todosSlice,
    currentTodo: currentTodoSlice,
    filter: filterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
