import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { todosSlice } from '../features/todos';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { currentTodoSlice } from '../features/currentTodo';
import { filterSlice } from '../features/filter';

const rootReducer = combineSlices({
  todos: todosSlice.reducer,
  currentTodo: currentTodoSlice.reducer,
  filter: filterSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
