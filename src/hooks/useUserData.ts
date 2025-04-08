import { useState, useEffect } from 'react';
import { getUser } from '../api';
import { Todo } from '../types/Todo';

interface UserData {
  name: string;
  email: string;
}

export const useUserData = (todo: Todo | null) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (todo) {
      setIsLoading(true);
      getUser(todo.userId)
        .then(userData => {
          setUser(userData);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setUser(null);
    }
  }, [todo]);

  return { user, isLoading };
};
