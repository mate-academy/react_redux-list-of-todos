import { ToDo } from '../types/ToDo';
import { User } from '../types/User';

const BASE_URL = 'https://mate.academy/students-api';

export const getTodosFromServer = async (): Promise<ToDo[]> => {
  const response = await fetch(`${BASE_URL}/todos`);

  return response.json();
};

export const getUserFromServer = async (id: number): Promise<User> => {
  const response = await fetch(`${BASE_URL}/users/${id}`);

  return response.json();
};

export const deleteTodo = async (id: number) => {
  await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'DELETE',
  });
};

export const addTodo = async (todo: Omit<ToDo, 'createdAt' | 'updatedAt'>) => {
  await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
