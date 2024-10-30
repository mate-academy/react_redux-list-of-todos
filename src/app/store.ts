import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { filterSlice } from '../features/filter';
import { todosSlice } from '../features/todos';
import { currentTodoSlice } from '../features/currentTodo';

const rootReducer = combineReducers({
  filter: filterSlice.reducer,
  todos: todosSlice.reducer,
  currentTodo: currentTodoSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
