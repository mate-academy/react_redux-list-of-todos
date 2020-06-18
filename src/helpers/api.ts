const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

const getAll = <T>(url: string): Promise<T[]> => {
  return fetch(`${API_URL}/${url}.json`)
    .then(response => response.json());
};

export const getTodos = () => getAll<Todo>('/todos');
export const getUsers = () => getAll<User>('/users');

export const getAppData = async (): Promise<Todo[]> => {
  const todosFromServer = await getTodos();
  const users = await getUsers();

  return todosFromServer.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  }));
};
