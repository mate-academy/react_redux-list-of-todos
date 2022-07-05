import { User } from '../react-app-env';

const BASE_URL = 'https://mate.academy/students-api/users';

export async function getUser(userId: number): Promise<User> {
  const res = await fetch(`${BASE_URL}/${userId}`);

  return res.json();
}
