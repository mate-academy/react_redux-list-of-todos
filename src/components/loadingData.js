export const loadData = async(url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const getTodosWithUsers = async() => {
  const url = 'https://jsonplaceholder.typicode.com/';

  const todos = await loadData(`${url}todos`);
  const users = await loadData(`${url}users`);

  const todosWithUsers = await todos.map(todo => (
    {
      ...todo,
      user: users.find(person => person.id === todo.userId),
    }
  ));

  return todosWithUsers;
};
