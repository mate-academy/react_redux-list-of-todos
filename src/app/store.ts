import { combineSlices, configureStore } from '@reduxjs/toolkit';
import filterSliceReducer from '../features/filter';
import todosSliceReducer from '../features/todos';
import currentTodoSliceReducer from '../features/currentTodo';

const rootReducer = combineSlices({
  filter: filterSliceReducer,
  todos: todosSliceReducer,
  currentTodo: currentTodoSliceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
