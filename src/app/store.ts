import { configureStore } from '@reduxjs/toolkit';
import filterSlice from '../features/filter';
import todosSlice from '../features/todos';
import currentTodoSlice from '../features/currentTodo';

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    allTodos: todosSlice,
    currentTodo: currentTodoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
