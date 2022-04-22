import { User } from '../types/user.type';
import { getData } from './api';
import { ENDPOINTS } from './api.constants';

export const getUsers = (): Promise<User[]> => getData(`${ENDPOINTS.users}`);

export const getUser = (userId: number): Promise<User> => getData(`${ENDPOINTS.users}/${userId}`);
