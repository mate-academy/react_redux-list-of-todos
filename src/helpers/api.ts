const API__URL__TODOS = 'https://jsonplaceholder.typicode.com/todos';
const API__URL__USERS = 'https://jsonplaceholder.typicode.com/users';

const todos = () => {
  return fetch(`${API__URL__TODOS}`)
    .then(response => response.json());
};

const users = () => {
  return fetch(`${API__URL__USERS}`)
    .then(response => response.json());
};

export const getTodosFromServer = async () => {
  const [todosData, usersData] = await Promise.all([todos(), users()]);

  return todosData.map((todo: TodoFromServer) => {
    const userCatalog = usersData.find((user: UserFromServer) => todo.userId === user.id);

    return {
      ...todo,
      userCatalog,
    };
  });
};
