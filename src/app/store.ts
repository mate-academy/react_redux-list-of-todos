import { combineSlices, configureStore } from '@reduxjs/toolkit';
import todosSlice from '../features/todos';

const rootReducer = combineSlices(todosSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
