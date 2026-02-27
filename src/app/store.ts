import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { selectedTodoSlice } from '../features/selectedTodo';
import { filterSlice } from '../features/filter';
import { todosSlice } from '../features/todos';

const rootReducer = combineSlices({
  todos: todosSlice.reducer,
  selectedTodo: selectedTodoSlice.reducer,
  filter: filterSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
