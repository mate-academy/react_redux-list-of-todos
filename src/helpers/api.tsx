const URL_API = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

export async function getData<T>(url: string): Promise<T[]> {
  const response = await fetch(url);

  return response.json();
}


export async function getTodosFromServer() {
  const [todos, users] = await Promise.all([
    getData<Todo>(`${URL_API}/todos.json`),
    getData<User>(`${URL_API}/users.json`),
  ]);

  const completedTodo = todos.map((todo) => {
    return {
      ...todo,
      user: users.find(user => user.id === todo.userId),
    };
  });

  return completedTodo;
}
