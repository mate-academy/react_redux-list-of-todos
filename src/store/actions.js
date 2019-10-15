export const ACTION_TYPES = {
  START_LOADING: 'START_LOADING',
  TODOS_LIST_LOADED: 'TODOS_LIST_LOADED',
  TODO_DELETE: 'TODO_DELETE',
  HANDLE_SUCCESS: 'HANDLE_SUCCESS',
};

export const startLoading = () => ({
  type: ACTION_TYPES.START_LOADING,
});

export const handleSuccess = () => ({
  type: ACTION_TYPES.HANDLE_SUCCESS,
});

export const loadedTodosList = listOfTodos => ({
  type: ACTION_TYPES.TODOS_LIST_LOADED,
  payload: listOfTodos,
});

export const deleteTodo = id => ({
  type: ACTION_TYPES.TODO_DELETE,
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
        dispatch(handleSuccess());
      });
  }

  return loadData();
};

export const deleteTodos = id => (dispatch) => {
  dispatch(deleteTodo(id));
};
