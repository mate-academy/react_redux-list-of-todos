import { combineSlices, configureStore } from '@reduxjs/toolkit';
import currentTodoReducer from '../features/currentTodo';
import todoReducer from '../features/todos';
import filterReducer from '../features/filter';

const rootReducer = combineSlices({
  currentTodo: currentTodoReducer,
  todos: todoReducer,
  filter: filterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
