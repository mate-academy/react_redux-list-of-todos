import { combineSlices, configureStore } from '@reduxjs/toolkit';
import todosReducer, { TodosState } from '../features/todos';
import filterReducer, { FilterState } from '../features/filter';
import currentReducer, { CurrentTodo } from '../features/currentTodo';

const rootReducer = combineSlices({
  todos: todosReducer,
  filter: filterReducer,
  currentTodo: currentReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = {
  todos: TodosState;
  filter: FilterState;
  currentTodo: CurrentTodo;
};

export type AppDispatch = typeof store.dispatch;
