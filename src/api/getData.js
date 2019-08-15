const prepareData = async(value) => {
  const url = `https://jsonplaceholder.typicode.com/${value}`;

  return fetch(url)
    .then(response => response.json());
};

const getTodosWithUsers = async() => {
  const todosData = await prepareData('todos');
  const usersData = await prepareData('users');

  return todosData.map(todo => ({
    ...todo,
    user: usersData.find(user => user.id === todo.userId),
  }));
};

export default getTodosWithUsers;
