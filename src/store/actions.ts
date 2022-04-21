import { Dispatch } from 'react';
import { getTodos, getUserById } from '../api/api';
import {
  Actions, ActionsType, AddTodosAction, AddUserAction,
} from './types';

const addTodos = (payload: Todo[]): AddTodosAction => ({
  type: ActionsType.AddTodos,
  payload,
});

export const handleCheck = (payload: number) => ({
  type: ActionsType.HandleCheck,
  payload,
});

export const addUser = (payload: User | null): AddUserAction => ({
  type: ActionsType.AddUser,
  payload,
});

export const clearUser = () => ({
  type: ActionsType.ClearUser,
});

export const loadTodos = () => {
  return async (dispatch: Dispatch<Actions>) => {
    const todos = await getTodos();

    const addTodoAction = addTodos(todos);

    dispatch(addTodoAction);
  };
};

export const loadUser = (userId: number) => {
  return (dispatch: Dispatch<Actions>) => {
    getUserById(userId)
      .then(user => dispatch(addUser(user)))
      .catch(() => dispatch(addUser(null)));
  };
};
