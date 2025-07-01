import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTodos } from '../features/todos';
import { getTodos } from '../api';
import { useAppSelector } from './useAppSelector';

export const useTodosApp = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    getTodos()
      .then(todoFromServer => dispatch(setTodos(todoFromServer)))
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  return {
    isLoading,
    selectedTodo,
  };
};
