import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todosReducer from './features/todoSlice';
import filterReducer from './features/filterSlice';
import selectedTodoReducer from './features/selectedTodoSlice';

const rootReducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer,
  selectedTodo: selectedTodoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
