const getUrl = (endpoint: string) => (`https://mate.academy/students-api/${endpoint}`);

export const getPreparedTodos = async (): Promise<Todo[]> => {
  const fetchedTodos = await fetch(getUrl('todos'));
  const fetchedUsers = await fetch(getUrl('users'));
  const jsonTodos = await fetchedTodos.json();
  const jsonUsers = await fetchedUsers.json();
  const todos = jsonTodos.data;
  const users = jsonUsers.data;

  return todos.map((todo: Todo) => ({
    ...todo,
    user: users.find((user: User) => user.id === todo.userId),
  }));
};
