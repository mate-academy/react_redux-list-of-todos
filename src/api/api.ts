import { USERS_URL, TODOS_URL } from '../constants/constants';

export const getData = <T>(url: string): Promise<T> => {
  return fetch(url)
    .then(response => response.json());
};

const getUsers = (usersUrl: string): Promise<User[]> => {
  return getData(usersUrl);
};

const getTodos = (todosUrl: string): Promise<Todo[]> => {
  return getData(todosUrl);
};

export const getPreparedTodos = async (): Promise<TodoWithUser[]> => {
  const todos = await getTodos(TODOS_URL);
  const users = await getUsers(USERS_URL);

  const preparedTodos = todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId) as User,
  }));

  return preparedTodos;
};
