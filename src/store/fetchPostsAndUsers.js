import { handleError, startLoading, handleSuccess } from './actions';

const loadTodosAndUsers = () => (dispatch) => {
  dispatch(startLoading());

  function getData() {
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch('https://jsonplaceholder.typicode.com/todos'),
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

// const handleGetData = () => {
//   this.setState({
//     isButtonShow: false,
//     isLoaded: true,
//   });
//
//   Promise.all([
//     fetch('https://jsonplaceholder.typicode.com/users'),
//     fetch('https://jsonplaceholder.typicode.com/todos'),
//   ])
//     .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
//     .then(([users, todos]) => this.setState({
//       isLoaded: false,
//       users,
//       todos,
//     }))
//     .catch(() => {
//       this.setState({
//         hasError: true,
//       });
//     });
// };
//
// export default handleGetData();
