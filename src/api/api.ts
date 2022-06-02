import { Todo, User } from '../types/TodoType';

const API_URL = 'https://mate.academy/students-api';

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_URL}/todos`);
  const gottenTodos: Todo[] = await response.json();

  return gottenTodos;
}

export async function getUser(userId: number): Promise<User> {
  const response = await fetch(`${API_URL}/users/${userId}`);
  const gottenUser = await response.json();

  return gottenUser;
}

// export async function removeTodo(id: number) {
//   fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
// }
