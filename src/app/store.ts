import { combineSlices, configureStore } from '@reduxjs/toolkit';
import filterReducer from '../features/filter';

const rootReducer = combineSlices();

export const store = configureStore({
  reducer: rootReducer,
  filter: filterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
