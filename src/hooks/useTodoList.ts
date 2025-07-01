import { useDispatch } from 'react-redux';
import { prepareTodos } from './../utils/prepareTodos';
import { useAppSelector } from './useAppSelector';

export const useTodoList = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);

  const visibleTodos = prepareTodos(todos, {
    searchByTitle: query,
    selectStatusTodos: status,
  });

  return { dispatch, selectedTodo, visibleTodos };
};
