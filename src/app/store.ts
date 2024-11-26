import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { reducer as currentTodoSlice } from '../features/currentTodo';
import { reducer as filterSlice } from '../features/filter';
import { reducer as todosSlice } from '../features/todos';

const rootReducer = combineSlices({
  currentTodo: currentTodoSlice,
  filter: filterSlice,
  todos: todosSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
