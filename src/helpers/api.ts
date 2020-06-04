const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchTodos = async (): Promise<TodoFromServer[]> => {
  const response = await fetch(`${API_URL}/todos`);

  return response.json();
};

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users`);

  return response.json();
};

export const getPreparedTodos = async (): Promise<Todo[]> => {
  const [todos, users] = await Promise.all([fetchTodos(), fetchUsers()]);

  return todos.map(todo => ({
    ...todo,
    user: users.find(currentUser => todo.userId === currentUser.id) as User,
  }));
};
