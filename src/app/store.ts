import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import todosReducer, { TodoState } from '../features/todos';
import currentTodoReducer, { CurrentTodoState } from '../features/currentTodo';
import filterReducer, { FilterState } from '../features/filter';

export const store: EnhancedStore<{
  todos: TodoState;
  currentTodo: CurrentTodoState;
  filter: FilterState;
}> = configureStore({
  reducer: {
    todos: todosReducer,
    currentTodo: currentTodoReducer,
    filter: filterReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
