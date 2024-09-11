import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { reducer as todosReducer } from '../features/todos';
import { filterSlice } from '../features/filter';
import { currentTodoSlice } from '../features/currentTodo';

const rootReducer = combineSlices({
  todos: todosReducer,
  filter: filterSlice.reducer,
  currentTodo: currentTodoSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
