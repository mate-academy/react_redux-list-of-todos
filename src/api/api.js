import {
  fetchTodosPending, fetchTodosSuccess, fetchTodosError,
} from '../store/todosList';
import {
  fetchUserPending, fetchUserSuccess, fetchUserError,
} from '../store/currentUser';

const BASE_URL = 'https://mate-api.herokuapp.com/';

const request = (key = 'todos') => fetch(`${BASE_URL}${key}`);

export const fetchTodos = () => {
  return (dispatch) => {
    dispatch(fetchTodosPending());
    request()
      .then(response => response.json())
      .then(todos => {
        dispatch(fetchTodosSuccess(todos.data));
      })
      .catch(error => dispatch(fetchTodosError(error)));
  };
};

export const fetchUser = (userId) => {
  return (dispatch) => {
    dispatch(fetchUserPending());
    request(`users/${userId}`)
      .then(response => response.json())
      .then(user => dispatch(fetchUserSuccess(user.data)))
      .catch(error => dispatch(fetchUserError(error)));
  };
};
