const URL = 'https://mate.academy/students-api';

export async function getAllTodos(): Promise<Todo[]> {
  const response = await fetch(`${URL}/todos`);

  return response.json();
}

export async function getUserById(id: number): Promise<User> {
  const response = await fetch(`${URL}/users/${id}`);

  return response.json();
}
