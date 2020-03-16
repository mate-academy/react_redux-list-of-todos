const API_URL = 'https://jsonplaceholder.typicode.com';

const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  return response.json();
};

const getUsers = async (): Promise<User[]> => {
  return getData<User[]>(`${API_URL}/users`);
};

const getTodos = async (): Promise<Todo[]> => {
  return getData<Todo[]>(`${API_URL}/todos`);
};

export const getPreparedTodos = async (): Promise<PreparedTodo[]> => {
  const todos: Todo[] = await getTodos();
  const users: User[] = await getUsers();

  const preparedTodos = todos.map((todo) => ({
    ...todo,
    user: users.find(user => todo.userId === user.id) as User,
  }));

  return preparedTodos;
};
