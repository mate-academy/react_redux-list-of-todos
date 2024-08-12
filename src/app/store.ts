import { combineSlices, configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos';
import currentTodoReducer from '../features/currentTodo';
import filterTodosReducer from '../features/filter';

const rootReducer = combineSlices({
  todos: todosReducer,
  currentTodo: currentTodoReducer,
  filterTodos: filterTodosReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;