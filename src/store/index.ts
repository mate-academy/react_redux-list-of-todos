import { configureStore } from '@reduxjs/toolkit';
import { getTodos } from '../api';
import selectedTodo from '../features/selectedTodo';
import todosReducer, { todosActions } from '../features/todos';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    selectedTodo,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const loadTodos = () => {
  return (dispatch: AppDispatch) => {
    dispatch(todosActions.startLoading());
    getTodos()
      .then(todosFromServer => dispatch(todosActions.setTodos(todosFromServer)))
      .finally(() => dispatch(todosActions.finishLoading()));
  };
};
