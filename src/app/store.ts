import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as filterReducer } from '../features/filter';
import todosReducer from '../features/todos';
import curentTodoReducer from '../features/currentTodo';

const rootReducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer,
  currentTodo: curentTodoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
