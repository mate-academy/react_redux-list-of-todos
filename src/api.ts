const TODOS_API = 'https://mate.academy/students-api/todos';
const USERS_API = 'https://mate.academy/students-api/users';

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(TODOS_API);

  return response.json();
}

export async function getUser(userId: number): Promise<User> {
  const response = await fetch(`${USERS_API}/${userId}`);

  return response.json();
}
