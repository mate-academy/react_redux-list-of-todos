import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todos';
import userReducer from './user';
import { todoApi } from '../api/todoApi';

export const store = configureStore({
  reducer: {
    todosReducer,
    userReducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(todoApi.middleware)
  ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
