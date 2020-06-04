const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api/';

export interface Users {
  id: number;
  name: string;
}

export interface Todos {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: Users;
}

const getTodos = (): Promise<Todos[]> => {
  return fetch(`${API_URL}/todos.json`)
    .then(response => response.json())
};

const getUsers = (): Promise<Users[]> => {
  return fetch(`${API_URL}/users.json`)
    .then(response => response.json())
};

export const getTodosFromServer = async() => {
  const [todosFromServer, usersFromServer] = await Promise.all([getTodos(), getUsers()]);

  return todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

}
