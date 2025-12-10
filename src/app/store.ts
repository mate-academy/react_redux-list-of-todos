import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { todosSlice } from '../features/todos';
import filterReducer from '../features/filter';
import currentTodoReducer from '../features/currentTodo';

const rootReducer = combineReducers({
  todos: todosSlice.reducer,
  filter: filterReducer,
  currentTodo: currentTodoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
