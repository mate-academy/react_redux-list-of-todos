import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { currentTodoSlice, filterSlice, todosSlice } from '../features';

const rootReducer = combineSlices(currentTodoSlice, filterSlice, todosSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
