import { combineSlices, configureStore } from '@reduxjs/toolkit';
import filterReducer from '../features/filter';

const rootReducer = combineSlices({
  filter: filterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
