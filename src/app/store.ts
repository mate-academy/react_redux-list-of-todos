import { combineSlices, configureStore } from '@reduxjs/toolkit';
import filterSlices from '../features/filter';
import todosSlices from '../features/todos';

const rootReducer = combineSlices({
  filter: filterSlices,
  todos: todosSlices,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
