import { useEffect, useState } from 'react';
import { getUser } from '../api';
import { User } from '../types/User';

export const useUser = (userId: number | undefined) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!userId) {
      setUser(null);

      return;
    }

    const fetchUser = async () => {
      try {
        setIsLoading(true);
        setErrorMessage('');
        const data = await getUser(userId);

        setUser(data);
      } catch {
        setErrorMessage('Failed to get user');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { isLoading, errorMessage, user };
};
