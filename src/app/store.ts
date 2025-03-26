import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { currentTodosReducer } from '../features/currentTodo';
import { todoReducer } from '../features/todos';
import { filterReducer } from '../features/filter';

const rootReducer = combineReducers({
  currentTodo: currentTodosReducer,
  todo: todoReducer,
  filter: filterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
