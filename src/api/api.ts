import { Todo, User } from '../react-app-env';

const API_URL = 'https://mate.academy/students-api';

export async function getAllTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_URL}/todos`);

  return response.json();
}

export async function getUserById(userId: number): Promise<User> {
  const response = await fetch(`${API_URL}/users/${userId}`);

  return response.json();
}

export const remove = async (id: number) => {
  const response = await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });

  return response;
};

export const addTodo = async () => {
  const response = await fetch(`${API_URL}/todos`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'А я сейчас вам покажу, '
          + 'откуда на Беларусь готовилось нападение',
        userId: 3,
        completed: false,
      }),
    });

  return response;
};
