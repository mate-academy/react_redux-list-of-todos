import { Todo, User } from '../types/type';

export const urlTodos = 'https://mate.academy/students-api/todos';

export const urlUser = 'https://mate.academy/students-api/users/';

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(urlTodos);

  return response.json();
};

export const getUserById = async (userId: number): Promise<User | null> => {
  const response = await fetch(`${urlUser}/${userId}`);

  return response.json();
};
