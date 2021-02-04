import {
  setPending, setTodos, setTodosError,
} from '../store/todosList';
import {
  setLoading, setUser, setUserError,
} from '../store/currentUser';

const BASE_URL = 'https://mate-api.herokuapp.com/';

const request = (key = 'todos') => fetch(`${BASE_URL}${key}`);

export const fetchTodos = () => {
  return (dispatch) => {
    dispatch(setPending());
    request()
      .then(response => response.json())
      .then(todos => {
        dispatch(setTodos(todos.data));
      })
      .catch(error => dispatch(setTodosError(error)));
  };
};

export const fetchUser = (userId) => {
  return (dispatch) => {
    dispatch(setLoading());
    request(`users/${userId}`)
      .then(response => response.json())
      .then(user => dispatch(setUser(user.data)))
      .catch(error => dispatch(setUserError(error)));
  };
};
