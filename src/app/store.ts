import { combineSlices, configureStore, Store } from '@reduxjs/toolkit';
import todosSlice from '../features/todos';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import currentTodo from '../features/currentTodo';
import filterSlice from '../features/filter';

const rootReducer = combineSlices({
  todos: todosSlice,
  currentTodo: currentTodo,
  filter: filterSlice,
});

export const store: Store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
