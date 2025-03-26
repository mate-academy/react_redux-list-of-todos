import { combineSlices, configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos';
import filterReducer from '../features/filter';
import currentTodoReducer from '../features/currentTodo';
import userReducer from '../features/user';

const rootReducer = combineSlices({
  todos: todosReducer,
  filter: filterReducer,
  currentTodo: currentTodoReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
