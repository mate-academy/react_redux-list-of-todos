import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos';
import currentTodoReducer from '../features/currentTodo';
import filterSliceReducer from '..//features/filter';

const rootReducer = combineReducers({
  todos: todosReducer,
  currentTodo: currentTodoReducer,
  filter: filterSliceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
