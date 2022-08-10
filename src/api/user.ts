import User from '../types/User';
import { request } from './api';

export const getUser = (id: number): Promise<User> => {
  return request(`/users/${id}`);
};
