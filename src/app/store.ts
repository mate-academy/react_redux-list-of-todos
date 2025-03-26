import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as todosReducer } from '../features/todos';
import { reducer as currTodoReducer } from '../features/currentTodo';
import { reducer as filterReducer } from '../features/filter';

const rootReducer = combineReducers({
  todos: todosReducer,
  currTodo: currTodoReducer,
  filter: filterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
