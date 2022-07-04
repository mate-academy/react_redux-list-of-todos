const apiUrlTodos = 'https://mate.academy/students-api/todos';
const apiUrlUsers = 'https://mate.academy/students-api/users';

export const getTodos = ():Promise<Todo[]> => {
  return fetch(apiUrlTodos)
    .then(response => {
      if (!response.ok) {
        throw new Error('Todo error');
      }

      return response.json();
    });
};

export const getUsers = (selectedUserId: number) => {
  return fetch(`${apiUrlUsers}/${selectedUserId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('User error');
      }

      return response.json();
    });
};

export const deleteTodoFromServer = (userId: number) => {
  return fetch(`${apiUrlTodos}/${userId}`, {
    method: 'DELETE',
  });
};
