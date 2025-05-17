import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { todosSlice, filterSlice, currentTodoSlice } from '../features';

const rootReducer = combineSlices(todosSlice, currentTodoSlice, filterSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
