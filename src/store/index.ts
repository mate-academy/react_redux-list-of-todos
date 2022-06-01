/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import { toDosApi } from './apiWithRedux';
import toDoReducer from './toDosSlice';

export const store = configureStore({
  reducer: {
    toDos: toDoReducer,
    [toDosApi.reducerPath]: toDosApi.reducer,
  },

  // eslint-disable-next-line max-len
  middleware: (getDefaultMiddleware) => (getDefaultMiddleware().concat(toDosApi.middleware)),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
