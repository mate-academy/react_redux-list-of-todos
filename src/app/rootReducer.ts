// app/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import todosReducer from '../features/todos';
import currentTodoReducer from '../features/currentTodo';
import filterReducer from '../features/filter';

const rootReducer = combineReducers({
  todos: todosReducer,
  currentTodo: currentTodoReducer,
  filter: filterReducer,
});

export default rootReducer;
