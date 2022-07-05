import { Todo, User } from './react-app-env';

const url = 'https://mate.academy/students-api';

export const requestTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${url}/todos`);
  const todos = await response.json();

  return todos;
};

export const requestUserById = async (userId: number): Promise<User | null> => {
  try {
    const response = await fetch(`${url}/users/${userId}`);
    const user = await response.json();

    return user;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }

  return null;
};

export const deleteTodo = async (todoId: number) => {
  return fetch(`${url}/todos/${todoId}`, { method: 'DELETE' });
};
