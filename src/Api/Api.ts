const TODOS_API = 'https://jsonplaceholder.typicode.com/todos';
const USERS_API = 'https://jsonplaceholder.typicode.com/users';

const getData = <T>(url: string): Promise<T> => {
  return fetch(url)
    .then(response => response.json());
};

const getUsers = (): Promise<User[]> => {
  return getData(USERS_API);
};

const getTodos = (): Promise<Todo[]> => {
  return getData(TODOS_API);
};

export const getCompleteTodos = async () => {
  const [todosLoaded, users] = await Promise.all([getTodos(), getUsers()]);

  const todosWithUsers = todosLoaded.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  })) as Todo[];

  return todosWithUsers;
};
