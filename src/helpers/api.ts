const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const getDataFromServer = async (url: string) => {
  const response = await fetch(url);

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
