export const ACTION_TYPES = {
  START_LOADING: 'START_LOADING',
  TODOS_LIST_LOADED: 'TODOS_LIST_LOADED',
  USERS_LIST_LOADED: 'USERS_LIST_LOADED',
  TODO_DELETE: 'TODO_DELETE',
};

export const startLoading = () => ({
  type: ACTION_TYPES.START_LOADING,
});

export const loadedTodosList = listOfTodos => ({
  type: ACTION_TYPES.TODOS_LIST_LOADED,
  payload: listOfTodos,
});

export const loadedUsersList = users => ({
  type: ACTION_TYPES.USERS_LIST_LOADED,
  payload: users,
});

export const deleteTodo = id => ({
  type: ACTION_TYPES.USERS_LIST_LOADED,
  payload: id,
});

export const callAction = () => (dispatch) => {
  const todosFromApi = 'https://jsonplaceholder.typicode.com/todos';
  const usersFromApi = 'https://jsonplaceholder.typicode.com/users';

  dispatch(startLoading());

  function loadData() {
    Promise.all([
      fetch(todosFromApi),
      fetch(usersFromApi),
    ])
      .then(([todos, users]) => Promise.all([
        todos.json(),
        users.json(),
      ]))
      .then(([dataTodos, dataUsers]) => {
        const todosWithUsers = dataTodos.map(item => ({
          ...item,
          user: dataUsers.find(user => user.id === item.userId),
        }));

        dispatch(loadedTodosList(todosWithUsers));
      });
  }

  return loadData();
};

export const deleteTodos = id => (dispatch) => {
  dispatch(deleteTodo(id));
};
