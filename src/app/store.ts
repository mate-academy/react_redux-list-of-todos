import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { todosSlice } from '../features/todos';
import { filterSlice } from '../features/filter';
import currentTodoReducer from '../features/currentTodo';
import currentUserReducer from '../features/currentUser';
const rootReducer = combineSlices({
  todos: todosSlice.reducer,
  filter: filterSlice.reducer,
  currentTodo: currentTodoReducer,
  currentUser: currentUserReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
