import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { reducer as todosReducer } from '../features/todos';
import { reducer as filterReducer } from '../features/filter';
import { reducer as currentTodoReducer } from '../features/currentTodo';

const rootReducer = combineSlices({
  todos: todosReducer,
  filter: filterReducer,
  currentTodo: currentTodoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
