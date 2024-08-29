import { combineSlices } from '@reduxjs/toolkit';
import { todosSlice } from './todos';
import { filterSlice } from './filter';
import { currentTodoSlice } from './currentTodo';

export const rootReducer = combineSlices(
  todosSlice,
  filterSlice,
  currentTodoSlice,
);
