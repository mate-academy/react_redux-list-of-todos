import { useEffect, useState } from 'react';
import { getUser } from './../api';
import { User } from './../types/User';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './useAppSelector';

export const useTodoModal = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const dispatch = useDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const userId = selectedTodo?.userId ?? 0;

  useEffect(() => {
    getUser(userId)
      .then(userFromServer => {
        setUser(userFromServer);
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => setIsLoading(false));
  }, [userId]);

  return {
    isLoading,
    user,
    selectedTodo,
    dispatch,
  };
};
