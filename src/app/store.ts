import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../features/filter';
import { todosSlice } from '../features/todos';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    todos: todosSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
