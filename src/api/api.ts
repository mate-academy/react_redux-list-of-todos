import axios from 'axios';
import { Dispatch } from 'react';
import { Action, TodoAction } from '../Types/types';

// eslint-disable-next-line
const API_URL = `https://mate.academy/students-api/todos`;

export async function getUser(API_USER_URL:string) {
  const response = await fetch(API_USER_URL);

  const user = await response.json();

  return user;
}

export const fetchTodos = () => {
  return async (dispatch:Dispatch<TodoAction>) => {
    try {
      dispatch({ type: Action.ADD_TODOS_FROM_SERVER });
      const response = await axios.get(API_URL);

      dispatch({ type: Action.SUCCES_ADD_TODO, payload: response.data });
    } catch (e) {
      dispatch({
        type: Action.ERROR_ADD_TODO,
        payload: 'Can`t get data from server',
      });
    }
  };
};
