import { API_URL } from '../utils/constants';
import { UserType } from '../utils/interfaces';
import { getData } from './getData';

export const getUsersFromServer = async (): Promise<UserType[]> => {
  return getData<UserType[]>(`${API_URL}/users`);
};
