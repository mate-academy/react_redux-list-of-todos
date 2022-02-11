import { API_URL } from './todos';

export const getUser = async (userId: number): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${userId}`);

  return response.json();
};
