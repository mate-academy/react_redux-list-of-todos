import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { currentTodoSlice } from '../features/currentTodo';
import { filterSlice } from '../features/filter';
import { todosSlice } from '../features/todos';
import { useDispatch, useSelector } from 'react-redux';

const rootReducer = combineSlices({
  currentTodo: currentTodoSlice.reducer,
  filter: filterSlice.reducer,
  todos: todosSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
