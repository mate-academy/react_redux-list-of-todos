import { combineReducers, configureStore } from '@reduxjs/toolkit';
import filterSliceReducer from '../features/filter/filterSlice';
import todosSliceReducer from '../features/todos/todosSlice';
import currentTodoReducer from '../features/currentTodo';

const rootReducer = combineReducers({
  todos: todosSliceReducer,
  filter: filterSliceReducer,
  currentTodo: currentTodoReducer,
});

export const store = configureStore({ reducer: rootReducer });
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
