const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

const getTodos = () => {
  return fetch(`${API_URL}/todos.json`)
    .then(response => response.json());
};

const getUsers = () => {
  return fetch(`${API_URL}/users.json`)
    .then(response => response.json());
};

export const getDataFromServer = async (): Promise<GetTodos[]> => {
  const [todos, users] = await Promise.all([getTodos(), getUsers()]);

  return todos.map((todo: Todo) => ({
    ...todo,
    user: users.find((user: User) => todo.userId === user.id),
  }));
};
