import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { filterSlice } from '../features/filter';
import { todosSlice } from '../features/todos';

const rootReducer = combineSlices(filterSlice, todosSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
