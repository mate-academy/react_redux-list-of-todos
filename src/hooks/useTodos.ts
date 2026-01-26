import { useEffect, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { getTodos } from '../api';
import { todosSlice } from '../features/todos';

export const useTodos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setErrorMessage('');
        setIsLoading(true);
        const data = await getTodos();

        dispatch(todosSlice.actions.addTodos(data));
      } catch {
        setErrorMessage('Failed to get todos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [dispatch]);

  return { isLoading, errorMessage };
};
