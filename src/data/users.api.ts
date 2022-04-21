import { getData } from './api';
import { ENDPOINTS } from './api.constants';

export const getUsers = (): Promise<User[]> => getData<User[]>(ENDPOINTS.users);

export const getUser = (id: number): Promise<User> => getData<User>(`${ENDPOINTS.users}/${id}`);
