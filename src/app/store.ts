import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { todosReducer } from '../features/todos';
import { filterReducer } from '../features/filter';
import { todoReducer } from '../features/currentTodo';
import { userReducer } from '../features/user';

const rootReducer = combineSlices({
  todosReducer,
  filterReducer,
  todoReducer,
  userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
