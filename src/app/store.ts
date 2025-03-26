import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todosSlice from '../features/todos';
import currentTodoSlice from '../features/currentTodo';
import filterSlice from '../features/filter';

const rootReducer = combineReducers({
  todos: todosSlice,
  currentTodo: currentTodoSlice,
  filter: filterSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
