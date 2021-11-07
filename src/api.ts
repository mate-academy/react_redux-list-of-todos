import { Action, Dispatch } from 'redux';
import { actions as actionsTodos } from './store/todos';
import { actions as actionsUsers } from './store/user';

const API_URL = 'https://mate.academy/students-api';

export const request = (url: string) => {
  return fetch(`${API_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};

export const fetchUsers = () => {
  return (dispatch: Dispatch<Action>) => {
    request('/users')
      .then(json => dispatch(actionsUsers.getUsers(json)));
  };
};

export const fetchTodos = () => {
  return (dispatch: Dispatch<Action>) => {
    request('/todos')
      .then(json => dispatch(actionsTodos.getTodos(json)));
  };
};
