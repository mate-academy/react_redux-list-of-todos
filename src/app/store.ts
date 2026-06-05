import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import todosReducer from '../features/todos';
import filtersReducer from '../features/filter';
import { currentTodoSlice } from '../features/currentTodo';

const rootReducer = combineSlices({
  todos: todosReducer,
  filters: filtersReducer,
  currentTodo: currentTodoSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
