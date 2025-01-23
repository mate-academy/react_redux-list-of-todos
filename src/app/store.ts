import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todosReducer from '../features/todos';
import currentTodoReducer from '../features/currentTodo';
import filterReducer from '../features/filter';

const rootReducer = combineReducers({
  todos: todosReducer,
  currentTodo: currentTodoReducer,
  filter: filterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
