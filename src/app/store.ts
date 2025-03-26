import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { todosSlice } from '../features/todos';
import { currentTodoSlice } from '../features/currentTodo';
import { filterSlice } from '../features/filter';

const rootReducer = combineReducers({
  currentTodo: currentTodoSlice.reducer,
  filter: filterSlice.reducer,

  [todosSlice.reducerPath]: todosSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(todosSlice.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
