import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { reducer as todosReducer } from '../features/todos';
import { reducer as currentTodoReducer } from '../features/currentTodo';
import { reducer as filterReducer } from '../features/filter';

const rootReducer = combineSlices({
  todos: todosReducer,
  currentTodo: currentTodoReducer,
  filter: filterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
