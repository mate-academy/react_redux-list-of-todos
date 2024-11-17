import { combineSlices, configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos';
import currentTodoReducer from '../features/currentTodo';
import userReduser from '../features/users';
import filterReducer from '../features/filter';

const rootReducer = combineSlices({
  todos: todosReducer,
  currentTodo: currentTodoReducer,
  user: userReduser,
  filter: filterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
