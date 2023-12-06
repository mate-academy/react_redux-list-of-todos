import { getData } from './httpClient';
import { User } from './types/User';

export const getPosts = (userId: number) => {
  return getData<User>(`/users/${userId}`);
};
