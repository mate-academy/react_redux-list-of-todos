import { BASE_URL } from './baseUrl';

export async function getUser(userId: number): Promise<User> {
  const response = await fetch(`${BASE_URL}/users/${userId}`);

  return response.json();
}
