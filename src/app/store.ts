import { configureStore } from '@reduxjs/toolkit';
import { filterSlice } from '../features/filter';
import { todosSlice } from '../features/todos';

// const rootReducer = combineSlices(filterSlice, todosSlice);

export const store = configureStore({
  reducer: {
    filter: filterSlice.reducer,
    todos: todosSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
