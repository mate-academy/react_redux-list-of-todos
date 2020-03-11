import { User, Todo, PreparedTodo } from './types';

const API_URL = 'https://jsonplaceholder.typicode.com/';

export const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  return response.json();
}

export const getTodos = (): Promise<Todo[]> => {
  return getData<Todo[]>(`${API_URL}todos`);
};

export const getUsers = (): Promise<User[]> => {
  return getData<User[]>(`${API_URL}users`);
};

export const getPreparedTodos = async (): Promise<PreparedTodo[]> => {
  const todos: Todo[] = await getTodos();
  const users: User[] = await getUsers();
  const preparedTodos: PreparedTodo[] = todos.map(todo => ({
    ...todo,
    user: users.find(person => person.id === todo.userId),
  }));
  return preparedTodos;
};
