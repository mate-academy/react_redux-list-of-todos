import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todosSlice from '../features/todos';
import filterSlice from '../features/filter';

const rootReducer = combineReducers({ todos: todosSlice, filter: filterSlice });

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
