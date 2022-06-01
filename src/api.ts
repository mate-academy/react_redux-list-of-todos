const API_URL = 'https://mate.academy/students-api';

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_URL}/todos`);

  return response.json();
}

export async function getUser(userId: number): Promise<User> {
  const response = await fetch(`${API_URL}/users/${userId}`);

  return response.json();
}

export async function removeTodo(id: number) {
  fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
}
