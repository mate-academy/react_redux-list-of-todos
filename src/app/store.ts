import { combineSlices, configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos';
import currentTodosReducer from '../features/currentTodo';
import filterReducer from '../features/filter';

const rootReducer = combineSlices({
  todos: todosReducer,
  currentTodo: currentTodosReducer,
  filter: filterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
