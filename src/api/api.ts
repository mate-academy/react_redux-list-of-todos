import { Todo, User } from '../react-app-env';

const API_URL = 'https://mate.academy/students-api';

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${API_URL}/todos`);

  return response.json();
};

export const getUserById = async (userId: number): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${userId}`);

  return response.json();
};

export const deleteTodoById = async (todoId: number):Promise<Todo[]> => {
  const response = await fetch(`${API_URL}/todos/${todoId}`,
    { method: 'DELETE' });

  return response.json();
};
