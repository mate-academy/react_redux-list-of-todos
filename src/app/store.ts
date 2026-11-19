import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { todosSlice } from '../features/todos';
import { filterSlice } from '../features/filter';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { currentTodo } from '../features/currentTodo';

const rootReducer = combineSlices(todosSlice, filterSlice, currentTodo);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
