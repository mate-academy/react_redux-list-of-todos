// src/store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todosReducer from './features/todoSlice';
import filterReducer from './features/filterSlice';
import selectedTodoReducer from './features/currentTodo';

const rootReducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer,
  selectedTodo: selectedTodoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Заміна: використовуємо store.getState, щоб TS не намагався "назвати" TodosState з зовнішнього модуля
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
