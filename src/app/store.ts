import { configureStore } from '@reduxjs/toolkit';
import { currentTodoSlice } from '../features/currentTodo';
import { filterTodoSlice } from '../features/filter';
import { todosSlice } from '../features/todos';

export const store = configureStore({
  reducer: {
    currentTodo: currentTodoSlice.reducer,
    filter: filterTodoSlice.reducer,
    todos: todosSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
