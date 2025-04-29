import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { currentTodoSlice } from '../features/currentTodo';
import { filterSlice } from '../features/filter';
import { todosSlice } from '../features/todos';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const rootReducer = combineSlices({
  filter: filterSlice.reducer,
  currentTodo: currentTodoSlice.reducer,
  todos: todosSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
