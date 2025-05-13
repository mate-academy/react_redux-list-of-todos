import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { filterReducer } from '../features/filter';
import { todosReducer } from '../features/todos';
import { currentTodoReducer } from '../features/currentTodo';

const rootReducer = combineReducers({
  filter: filterReducer,
  todos: todosReducer,
  currentTodo: currentTodoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
