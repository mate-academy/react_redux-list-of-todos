import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as reducerCurrentTodo } from '../features/currentTodo';
import { reducer as reducerFilter } from '../features/filter';
import { reducer as reducerTodos } from '../features/todos';

const rootReducer = combineReducers({
  todos: reducerTodos,
  todo: reducerCurrentTodo,
  filter: reducerFilter,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
