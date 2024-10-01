import { combineSlices, configureStore } from '@reduxjs/toolkit';
import filterReducer from '../features/filter';
import currentTodoReducer from '../features/currentTodo';

const rootReducer = combineSlices({
  filter: filterReducer,
  currentTodo: currentTodoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
