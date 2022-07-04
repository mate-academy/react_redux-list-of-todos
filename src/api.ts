import { Todo, User } from './react-app-env';

const url = 'https://mate.academy/students-api';

export const requestTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${url}/todos`);
  const todo = await response.json();

  return todo;
};

export const requestUserById = async (userId: number): Promise<User> => {
  const response = await fetch(`${url}/users/${userId}`);
  const user = await response.json();

  return user;
};

export const deleteTodo = async (todoId: number) => {
  const response = await fetch(`${url}/todos/${todoId}`, { method: 'DELETE' });
  const deletedTodo = await response.json();

  return deletedTodo;
};
