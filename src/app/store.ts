import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { currentTodoSlice } from '../features/currentTodo';
import { todosSlice } from '../features/todos';
import { filterSlice } from '../features/filter';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const rootReducer = combineSlices({
  currentTodo: currentTodoSlice.reducer,
  todos: todosSlice.reducer,
  filter: filterSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
