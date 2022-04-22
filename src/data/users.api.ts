/* eslint-disable max-len */
import { getData } from './api';
// import { ENDPOINTS } from './api.constants';

// export const getUsers = (): Promise<User[]> => getData<User[]>(ENDPOINTS.users);
export const getUsers = (): Promise<User[]> => getData('/users');

// export const getUser = (id: number): Promise<User> => getData<User>(`${ENDPOINTS.users}/${id}`);

export const getUser = (userId: number): Promise<User> => getData(`/users/${userId}`);
