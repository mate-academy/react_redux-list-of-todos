import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos';
import filterReducer from '../features/filter';
import currentTodoSlice from '../features/currentTodo';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    filter: filterReducer,
    current: currentTodoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
