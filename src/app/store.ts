import { combineReducers, configureStore } from '@reduxjs/toolkit';
import filterReducer from '../features/filter'; // ✅ Correctly used filterReducer
import todosReducer from '../features/todos';
import modalReducer from '../components/TodoModal/modalSlice';
import currentTodoReducer from '../features/currentTodo';
import userReducer from '../features/users';

export const rootReducer = combineReducers({
  filter: filterReducer, // ✅ Correctly used filterReducer
  todos: todosReducer,
  modal: modalReducer,
  currentTodo: currentTodoReducer,
  users: userReducer,
});

export const store = configureStore({
  reducer: rootReducer, // ✅ Root reducer is correctly used here
});

export type RootState = ReturnType<typeof store.getState>; // ✅ Ensures accurate type inference
export type AppDispatch = typeof store.dispatch; // ✅ Defines the dispatch type
