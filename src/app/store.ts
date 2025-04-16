import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { filterSlice } from '../features/filter';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { currentTodoSlice } from '../features/currentTodo';
import { todosSlice } from '../features/todos';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

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
