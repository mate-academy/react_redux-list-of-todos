/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import queryReducer from './filterQuerySlice';
import { toDosApi } from './apiWithRedux';

export const store = configureStore({
  reducer: {
    query: queryReducer,
    [toDosApi.reducerPath]: toDosApi.reducer,
  },

  // eslint-disable-next-line max-len
  middleware: (getDefaultMiddleware) => (getDefaultMiddleware().concat(toDosApi.middleware)),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
