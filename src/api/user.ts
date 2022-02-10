import { User } from '../react-app-env';

const API_URL = 'https://mate.academy/students-api/users/';

export async function getUser(userId: number): Promise<User> {
  const response = await fetch(`${API_URL}${userId}`);

  return response.json();
}
