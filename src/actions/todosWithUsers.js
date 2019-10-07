const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

// action creators
export function todosWithUsersFetchDataSucces(todosWithUsers) {
  return {
    type: 'TODOS_WITH_USERS_FETCH_DATA_SUCCESS',
    todosWithUsers,
  };
}

export function isLoadingStart() {
  return {
    type: 'IS_LOADING_START',
  };
}

export function deleteTodo(id) {
  return {
    type: 'DELETE_TODO',
    payload: id,
  };
}

// async function fetch data
export function todosWithUsersFetchData() {
  return (dispatch) => {
    dispatch(isLoadingStart());

    Promise.all([
      fetch(TODOS_URL),
      fetch(USERS_URL),
    ])
      .then(([todosResponse, usersResponse]) => {
        if (!todosResponse.ok) {
          throw new Error(todosResponse.statusText);
        }
        if (!usersResponse.ok) {
          throw new Error(usersResponse.statusText);
        }

        return Promise.all([todosResponse.json(), usersResponse.json()]);
      })
      .then(([todosData, usersData]) => {
        const preparedTodos = todosData.map(todo => ({
          ...todo,
          user: usersData.find(user => user.id === todo.userId),
        }));
        dispatch(todosWithUsersFetchDataSucces(preparedTodos));
      });
  };
}
