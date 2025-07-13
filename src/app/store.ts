import { combineSlices, configureStore } from '@reduxjs/toolkit';
import filterReducer, { FilterStateSlice } from '../features/filter';
import todosReducer, { TodosState } from '../features/todos';
import currentTodoReducer, { CurrentTodoState } from '../features/currentTodo';

const rootReducer = combineSlices({
  filterSlice: filterReducer,
  todosSlice: todosReducer,
  currentTodoSlice: currentTodoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = {
  filterSlice: FilterStateSlice;
  todosSlice: TodosState;
  currentTodoSlice: CurrentTodoState;
};
export type AppDispatch = typeof store.dispatch;
