import { combineReducers, createStore } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { reducer as currentTodoReducer } from '../features/currentTodo';
import { reducer as filterReducer } from '../features/filter';
import { reducer as todosReducer } from '../features/todos';

const rootReducer = combineReducers({
  todos: todosReducer,
  currentTodo: currentTodoReducer,
  filters: filterReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
