const API_URL = 'https://jsonplaceholder.typicode.com';

const getFromServer = async() => {
  const responseTodos = await fetch(`${API_URL}/todos`);
  const todos = await responseTodos.json();

  const responseUsers = await fetch(`${API_URL}/users`);
  const users = await responseUsers.json();

  const userWithTodo = todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  })
  );
  return userWithTodo;
};

export default getFromServer;
