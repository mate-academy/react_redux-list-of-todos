import { configureStore, combineSlices } from '@reduxjs/toolkit';
import { currentTodoSlice } from '../features/currentTodo';
import { currentUserSlice } from '../features/currentUser';
import { filterSlice } from '../features/filter';
import { todosSlice } from '../features/todos';

// ✅ Combine all slices
const rootReducer = combineSlices({
  filter: filterSlice.reducer,
  todos: todosSlice.reducer,
  currentTodo: currentTodoSlice.reducer,
  currentUser: currentUserSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
