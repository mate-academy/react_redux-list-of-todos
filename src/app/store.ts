import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import todosReducer, { TodosState } from '../features/todos';
import filterReducer, { FilterState } from '../features/filter';
import currentTodoReducer, { CurrentTodoState } from '../features/currentTodo';

export const store: EnhancedStore<{
  todos: TodosState;
  filter: FilterState;
  currentTodo: CurrentTodoState;
}> = configureStore({
  reducer: {
    todos: todosReducer,
    filter: filterReducer,
    currentTodo: currentTodoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
