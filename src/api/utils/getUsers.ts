import { API_URL } from '../constants/constants';
import { getData } from './getData';

export const getUsers = (): Promise<User[]> => getData<User[]>(`${API_URL}/users`);
