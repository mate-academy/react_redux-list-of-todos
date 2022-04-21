import { Todo } from '../types/Todo';
import { User } from '../types/User';
import { Actions, ActionsType } from './types';

export const addTodosAction = (payload: Todo[]): Actions => ({
  type: ActionsType.AddTodos,
  payload,
});

export const addUserAction = (payload: User): Actions => ({
  type: ActionsType.AddUser,
  payload,
});

export const setUserIdAction = (payload: number): Actions => ({
  type: ActionsType.SetUserId,
  payload,
});
