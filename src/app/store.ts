import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { todosSlice } from '../features/todos';
import { filterSlice } from '../features/filter';
import { currentTodoSlice } from '../features/currentTodo';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const rootReducer = combineSlices(todosSlice, filterSlice, currentTodoSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export const selector: TypedUseSelectorHook<RootState> = useSelector

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
