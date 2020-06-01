const API_URL = 'https://jsonplaceholder.typicode.com';

export const getTodos = () => {
  return fetch(`${API_URL}/todos`)
    .then(response => response.json());
};

export const getUsers = () => {
  return fetch(`${API_URL}/users`)
    .then(response => response.json());
};

export const getPreparedData = async () => {
  const [todosData, usersData] = await Promise.all(
    [getTodos(), getUsers()],
  );

  const preparedTodos = todosData.map((todo: Todo) => ({
    ...todo,
    user: usersData.find((user: User) => user.id === todo.userId),
  }));

  return preparedTodos;
};
