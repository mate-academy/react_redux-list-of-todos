import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { todosReduser } from '../features/todos';
import { filterReducer } from '../features/filter';
import { currentTodoReducer } from '../features/currentTodo';

const rootReducer = combineSlices({
  todos: todosReduser,
  filters: filterReducer,
  currentTodo: currentTodoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
