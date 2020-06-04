const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

const getAllTodos = <T>(url: string): Promise<T[]> => {
  return fetch(API_URL + url)
    .then(response => response.json());
};

export const getUsers = () => getAllTodos<User>('/users.json');
export const getTodos = () => getAllTodos<Todo>('/todos.json');

export const getPreparedData = async () => {
  const [todosFromServer, usersFromServer] = await Promise.all(
    [getTodos(), getUsers()],
  );

  const todosWithUsers = todosFromServer.map((todo) => ({
    ...todo,
    user: usersFromServer.find((user) => user.id === todo.userId),
  }));

  return todosWithUsers;
};
