const URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api/';


const responseTodos = () => {
  return fetch(`${URL}todos.json`)
    .then(response => response.json());
};

const responseUsers = () => {
  return fetch(`${URL}users.json`)
    .then(response => response.json());
};

export const getTodos = async () => {
  const todosData = await responseTodos();
  const usersData = await responseUsers();


  return todosData.map((todo: Todo) => {
    const userInfo = usersData.find((user: User) => todo.userId === user.id);

    return {
      ...todo,
      user: userInfo.name,
    };
  });
};
