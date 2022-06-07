const API_URL = 'https://mate.academy/students-api';

export async function getTodos() {
  const response = await fetch(`${API_URL}/todos`);

  return response.json();
}

export async function getUser(id: number) {
  const users = await fetch(`${API_URL}/users/${id}`);

  return users.json();
}
