import { handleError, startLoading, handleSuccess } from './actions';

const loadTodosAndUsers = () => (dispatch) => {
  const usersApi = 'https://jsonplaceholder.typicode.com/users';
  const todosApi = 'https://jsonplaceholder.typicode.com/todos';

  dispatch(startLoading());

  function getData() {
    Promise.all([
      fetch(usersApi),
      fetch(todosApi),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([users, todos]) => {
        const preparedTodos = todos.map(todo => ({
          ...todo,
          user: users.find(user => user.id === todo.userId),
        }));
        dispatch(handleSuccess(preparedTodos));
      })
      .catch(() => {
        dispatch(handleError());
      });
  }
  getData();
};

export default loadTodosAndUsers;
