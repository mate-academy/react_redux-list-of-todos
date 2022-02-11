const url = 'https://mate.academy/students-api';

export async function getTodos(): Promise<Todo[]> {
  const todos = await fetch(`${url}/todos`);

  return todos.json();
}

export async function getUser(userId: number): Promise<User> {
  const user = await fetch(`${url}/users/${userId}`);

  return user.json();
}
