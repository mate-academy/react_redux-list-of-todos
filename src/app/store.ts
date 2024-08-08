import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { currentTodoSlice } from '../features/currentTodo';
import { filterSlice } from '../features/filter';
import { todosSlice } from '../features/todos';

const rootReducer = combineSlices(todosSlice, filterSlice, currentTodoSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
