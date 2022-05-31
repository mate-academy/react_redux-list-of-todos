import { ToDo } from '../types/ToDo';
import { User } from '../types/User';

const baseURL = 'https://mate.academy/students-api';

export const getToDosFromAPI = async (): Promise<Array<ToDo>> => {
  const response = await fetch(`${baseURL}/todos`);

  return response.json();
};

export const getUserByIdFromServer = async (id: number): Promise<User> => {
  const response = await fetch(`${baseURL}/users/${id}`);

  return response.json();
};
