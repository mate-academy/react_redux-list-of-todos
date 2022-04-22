import { User } from '../types/user.type';
import { getData } from './api';
import { ENDPOINTS } from './api.constants';

export const getUserById = (userId: number): Promise<User> => getData(`${ENDPOINTS.users}/${userId}`);
