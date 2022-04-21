import { Todo } from '../types/todo';
import { User } from '../types/user';
import {
  ActionsType, LoadTodosAction, LoadUserAction, RemoveTodoAction,
  SelectUserIdAction,
} from './types';

export const todosAction = (payload: Todo[]): LoadTodosAction => ({
  type: ActionsType.LoadTodos,
  payload,
});

export const removeTodoAction = (payload: number): RemoveTodoAction => ({
  type: ActionsType.DeleteTodo,
  payload,
});

export const selectUserIdAction = (payload: number): SelectUserIdAction => ({
  type: ActionsType.SelectUserId,
  payload,
});

export const userAction = (payload: User): LoadUserAction => ({
  type: ActionsType.LoadUser,
  payload,
});
