import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { todosSlice } from '../features/todos';
import { filterSlice } from '../features/filter';
import { currentTodoSlice } from '../features/currentTodo';
import { currentUserSlice } from '../features/user';

const rootReducer = combineSlices({
  todos: todosSlice.reducer,
  todo: currentTodoSlice.reducer,
  filter: filterSlice.reducer,
  user: currentUserSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
