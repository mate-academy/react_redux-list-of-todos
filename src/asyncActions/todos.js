import { addTodos, addUser } from '../store';

export const fetchTodos = () => {
  // eslint-disable-next-line
  return function (dispatch) {
    fetch('https://mate.academy/students-api/todos')
      .then(response => response.json())
      .then(json => dispatch(addTodos(json)));
  };
};

export const fetchUser = (userId) => {
  // eslint-disable-next-line
  return function (dispatch) {
    fetch(`https://mate.academy/students-api/users/${userId}`)
      .then(response => response.json())
      .then(json => dispatch(addUser(json)))
      .catch(() => dispatch(addUser(null)));
  };
};
