import { combineSlices, configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos';
import filtersReducer from '../features/filter';
import currentTodoReducer from '../features/currentTodo';

const rootReducer = combineSlices({
  todos: todosReducer,
  filters: filtersReducer,
  currentTodo: currentTodoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
