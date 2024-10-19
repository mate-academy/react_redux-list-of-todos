import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { filterSlice } from '../features/filter';
import { todosSlice } from '../features/todos';
import { currentTodoSlice } from '../features/currentTodo';

const rootReducer = combineSlices({
  currentTodo: currentTodoSlice.reducer,
  filter: filterSlice.reducer,
  todos: todosSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
