import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { filterSlice } from '../features/filter';
import { todosSlice } from '../features/todos';

const rootReducer = combineSlices({
  filter: filterSlice.reducer,
  todos: todosSlice.reducer,
});

export const store = configureStore({
  reducer: {
    filter: filterSlice.reducer,
    todos: todosSlice.reducer,
  },
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
