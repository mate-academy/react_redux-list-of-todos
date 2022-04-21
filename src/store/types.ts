import { Action as BaseAction } from 'redux';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

export interface RootState {
  todos: Todo[],
  selectedUserId: number,
  user: User | null,
}

export interface Action<T, P> extends BaseAction<T> {
  payload: P,
}

export enum ActionsType {
  AddTodos = 'addTodos',
  AddUser = 'addUsers',
  SetUserId = 'setUserId',
}

type AddTodosAction = Action<ActionsType.AddTodos, Todo[]>;
type AddUserAction = Action<ActionsType.AddUser, User>;
type SetUserIdAction = Action<ActionsType.SetUserId, number>;

export type Actions = AddTodosAction | AddUserAction | SetUserIdAction;
