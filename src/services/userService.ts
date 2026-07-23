import { request } from './api';
import { User } from '../types/User';

export const userService = {
  getById(id: number) {
    return request<User>(`/users/${id}.json`);
  },
};
