import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { currentTodoSlice } from '../features/currentTodo';
import todosSlice from '../features/todos';
import { filterSlice } from '../features/filter';

const rootReducer = combineReducers({
  currentTodo: currentTodoSlice.reducer,
  todos: todosSlice.reducer,
  filter: filterSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
