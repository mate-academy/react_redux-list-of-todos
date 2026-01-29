import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { reducer as todosSlice } from '../features/todos';
import { reducer as filterSlice } from '../features/filter';
import { reducer as currentTodoSlice } from '../features/currentTodo';

const rootReducer = combineSlices({
  todos: todosSlice,
  filter: filterSlice,
  current: currentTodoSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
