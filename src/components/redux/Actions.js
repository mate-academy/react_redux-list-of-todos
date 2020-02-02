export const ACTION_TYPES = {
  SAVE: 'SAVE',
  SET_LOAD_ERROR: 'SET_LOAD_ERROR',
  START_LOADING: 'START_LOADING',
  STOP_LOADING: 'STOP_LOADING',
  DELETE_TODO: 'DELETE_TODO',
  SORT_TODOS: 'SORT_TODOS',
};

const save = data => ({
  type: ACTION_TYPES.SAVE,
  payload: data,
});

const setError = error => ({
  type: ACTION_TYPES.SET_LOAD_ERROR,
  payload: error,
});

const startLoading = () => ({
  type: ACTION_TYPES.START_LOADING,
});

const stopLoading = () => ({
  type: ACTION_TYPES.STOP_LOADING,
});

const deleteTodo = todoId => ({
  type: ACTION_TYPES.DELETE_TODO,
  todoId,
});

const switcher = sorter => ({
  type: ACTION_TYPES.SORT_TODOS,
  payload: sorter,
});

export const sortTodos = sorter => (dispatch) => {
  dispatch(switcher(sorter));
};

export const todoDelete = todoId => (dispatch) => {
  dispatch(deleteTodo(todoId));
};

const urls = [
  'https://jsonplaceholder.typicode.com/todos',
  'https://jsonplaceholder.typicode.com/users',
];

export const todosURL = () => (dispatch) => {
  dispatch(startLoading());

  const promises = urls.map(url => fetch(url).then(y => y.json()));

  Promise.all(promises).then((results) => {
    dispatch(save(results));
  })
    .catch(error => dispatch(setError(error.message)))
    .finally(() => dispatch(stopLoading()));
};
