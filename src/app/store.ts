import { combineSlices, configureStore } from '@reduxjs/toolkit';
import filterReducer from '../features/filter';
import todosrReducer from '../features/todos';
import currentTodoReducer from '../features/currentTodo';
import userReducer from '../features/user';

const rootReducer = combineSlices({
  filter: filterReducer,
  todos: todosrReducer,
  currentTodo: currentTodoReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
