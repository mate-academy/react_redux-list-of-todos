import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';
import { currentTodoSlice } from '../features/currentTodo';
import { filterSlice } from '../features/filter';
import { todosSlice } from '../features/todos';
import { ChangeEvent } from 'react';

const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useTodos = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);

  const { setTodos } = todosSlice.actions;
  const { setCurrentTodo, resetCurrentTodo } = currentTodoSlice.actions;
  const { setQuery, clearQuery, setStatus } = filterSlice.actions;

  const handleSetTodos = (todosFromServer: Todo[]) =>
    dispatch(setTodos(todosFromServer));

  const handleSetCurrentTodo = (todo: Todo) => dispatch(setCurrentTodo(todo));

  const handleResetCurrentTodo = () => dispatch(resetCurrentTodo());

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) =>
    dispatch(setStatus(event.target.value as Status));

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) =>
    dispatch(setQuery(event.target.value.trimStart()));

  const handleClearQuery = () => dispatch(clearQuery());

  return {
    todos,
    handleSetTodos,
    currentTodo,
    handleSetCurrentTodo,
    handleResetCurrentTodo,
    setCurrentTodo,
    status,
    handleStatusChange,
    query,
    handleQueryChange,
    handleClearQuery,
  };
};
