import { Todo } from '../react-app-env';

const BASE_URL = 'https://mate.academy/students-api';

export const getTodos = async (): Promise<Todo []> => {
  const response = await fetch(`${BASE_URL}/todos`);

  return response.json();
};

export const addTodo = async (todo: Todo): Promise<Todo> => {
  const response = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  return response.json();
};

export const deleteTodo = async (todoId: number | undefined) => {
  const response = await fetch(`${BASE_URL}/todos/${todoId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  return response.json();
};
