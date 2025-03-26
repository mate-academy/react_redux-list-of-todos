import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { reducer as filterReducer } from '../features/filter';
import { reducer as todosReducer } from '../features/todos';
import { reducer as currentTodoReducer } from '../features/currentTodo';

const rootReducer = combineSlices({
  filter: filterReducer,
  todos: todosReducer,
  currentTodo: currentTodoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
