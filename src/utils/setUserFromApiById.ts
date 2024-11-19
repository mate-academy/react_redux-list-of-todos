import { Dispatch } from 'react';
import { getUser } from '../api';
import { User } from '../types/User';

export function setUserFromApiById(
  userId: number,
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
  setLoading: Dispatch<React.SetStateAction<boolean>>,
) {
  getUser(userId)
    .then(setUser)
    .catch(() => alert('User api is wrong!'))
    .finally(() => {
      setLoading(false);
    });
}
