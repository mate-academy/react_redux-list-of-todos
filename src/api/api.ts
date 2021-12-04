import { Action, Dispatch } from 'redux';
import { actions as actionsTodos } from '../store/todos';
import { actions as actionsUsers } from '../store/user';

const BASE_URL = 'https://mate.academy/students-api';

export const request = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};

export const getUsers = () => {
  return (dispatch: Dispatch<Action>) => {
    request('/users')
      .then(users => dispatch(actionsUsers.getUsers(users)));
  };
};

export const getTodos = () => {
  return (dispatch: Dispatch<Action>) => {
    request('/todos')
      .then(response => response.sort((a: Todo, b: Todo) => a.userId - b.userId))
      .then(todos => dispatch(actionsTodos.getTodos(todos)));
  };
};
