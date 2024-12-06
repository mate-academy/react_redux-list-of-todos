import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todosSlice from '../features/todos';
import filterSlice from '../features/filter';
import currentTodoSlice from '../features/currentTodo';

const rootReducer = combineReducers({
  todosSlice,
  filterSlice,
  currentTodoSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
