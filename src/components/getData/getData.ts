const URL_USERS = 'https://jsonplaceholder.typicode.com/users';
const URL_TODOS = 'https://jsonplaceholder.typicode.com/todos';

const getCommonData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  return response.json();
};

export const getUsers = (): Promise<User[]> => {
  return getCommonData(URL_USERS);
};

export const getTodos = (): Promise<Todo[]> => {
  return getCommonData(URL_TODOS);
};

export const getData = async (): Promise<TodoWithUser[]> => {
  const users = await getUsers();
  const todos = await getTodos();

  return todos.map((todo: Todo) => {
    return {
      ...todo,
      user: users.find((user: User) => user.id === todo.userId) as User,
    };
  });
};
