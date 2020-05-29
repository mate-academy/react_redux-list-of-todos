const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';
const API_URL_TODOS = `${API_URL}/todos.json`;
const API_URL_USERS = `${API_URL}/users.json`;

export async function getData<T>(url: string): Promise<T[]> {
  const response = await fetch(url);
  const json = await response.json();

  return json;
}

export async function getTodos() {
  const [todos, users] = await Promise.all([
    getData<Todo>(API_URL_TODOS),
    getData<User>(API_URL_USERS),
  ]);

  const preparedTodos = todos.map((todo) => {
    return {
      ...todo,
      user: users.find((user) => user.id === todo.userId) || {
        id: null,
        username: 'Unknown',
      },
    };
  });

  return preparedTodos;
}
