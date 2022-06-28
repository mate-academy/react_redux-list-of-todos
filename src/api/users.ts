import { User } from '../react-app-env';

const BASE_URL = 'https://mate.academy/students-api';

export const getAllUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);

  return response.json();
};

export const getUser = async (userId: number): Promise<User> => {
  const response = await fetch(`${BASE_URL}/users/${userId}`);

  return response.json();
};
