import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../features/slices';

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
