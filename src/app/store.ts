import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos';
import loadingReducer from '../features/loading';
import filterReducer from '../features/filter';
import currentTodoReducer from '../features/currentTodo';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    loading: loadingReducer,
    filter: filterReducer,
    currentTodo: currentTodoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
