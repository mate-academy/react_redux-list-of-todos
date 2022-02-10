import { Todo, User } from '../react-app-env';

const API_URL = 'https://mate.academy/students-api/';

export function getAllTodos(): Promise<Todo[]> {
  return fetch(`${API_URL}todos`).then(response => response.json());
}

export async function getUserById(userId: number): Promise<User> {
  const response = await fetch(`${API_URL}users/${userId}`);

  return response.json();
}

export const deleteTodoFromServer = async (todoId: number) => {
  await fetch(`${API_URL}/todos/${String(todoId)}`, {
    method: 'DELETE',
  });
};
