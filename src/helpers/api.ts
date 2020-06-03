const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api/';
const TODOS_URL = '/todos.json';
const USERS_URL = '/users.json';

const getDataFromServer = async (url: string) => {
  const response = await fetch(`${API_URL}${url}`);

  return response.json();
};

export const getTodosData = async () => {
  const tasks: Todo[] = await getDataFromServer(TODOS_URL);
  const users: User[] = await getDataFromServer(USERS_URL);
  const newTodos = tasks.map(task => ({
      ...task,
      user: users.find(user => user.id === task.userId),
    }));

  return newTodos;
};
