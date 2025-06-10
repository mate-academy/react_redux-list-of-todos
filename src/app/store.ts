import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos';
import currentTodoSlice from '../features/currentTodo';
import filterSlice from '../features/filter';

const rootReducer = combineReducers({
  todos: todosReducer,
  currentUser: currentTodoSlice,
  filter: filterSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
