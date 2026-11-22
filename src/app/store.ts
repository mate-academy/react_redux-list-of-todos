import { combineSlices, configureStore } from '@reduxjs/toolkit';
import filterReducer from '../features/filter';
import currentTodoReducer from '../features/currentTodo';
import todosReducer from '../features/todos';

const rootReducer = combineSlices({
  filter: filterReducer,
  currentTodo: currentTodoReducer,
  todos: todosReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
