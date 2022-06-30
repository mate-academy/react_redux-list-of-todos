import { Todo, User } from '../react-app-env';

const BASE_URL = 'https://mate.academy/students-api';

export const getTodos = async () : Promise<Todo[]> => {
  const response = await fetch(`${BASE_URL}/todos`);

  return response.json();
};

export const getUserById = async (userId: number): Promise<User> => {
  const response = await fetch(`${BASE_URL}/users/${userId}`);

  return response.json();
};

export function deleteRequest(specify : string) : Promise<Response> {
  const result = fetch(`${BASE_URL}/${specify}`, { method: 'DELETE' });

  return result;
}
