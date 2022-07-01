import { Todo, User } from '../react-app-env';

const URL = 'https://mate.academy/students-api';

export async function getAllTodos(): Promise<Todo[]> {
  const response = await fetch(`${URL}/todos`);

  return response.json();
}

export const getUserById = async (userId: number): Promise<User> => {
  const response = await fetch(`${URL}/users/${userId}`);

  return response.json();
}

export const remove = async (id: number) => {
  const response = await fetch(`${URL}/todos/${id}`, { method: 'DELETE' });

  return response;
};

export const addTodo = async () => {
  const response = await fetch(`${URL}/todos`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'The Title',
        completed: false,
        userId: Math.floor(Math.random() * 1000) + 1,
      }),
    });

  return response;
};
