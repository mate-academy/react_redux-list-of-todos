import { configureStore } from '@reduxjs/toolkit';
import reducerCurrentTodo from '../features/currentTodo';
import reducerFilter from '../features/filter';
import reducerTodos from '../features/todos';
const store = configureStore({
  reducer: {
    todos: reducerTodos,
    todo: reducerCurrentTodo,
    filter: reducerFilter,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
