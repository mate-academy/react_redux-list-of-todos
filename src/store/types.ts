import { Action as BaseAction } from 'redux';

export interface State {
  todos: Todo[],
  user: User | null,
}

export interface Action<T, P> extends BaseAction<T> {
  payload: P;
}

export enum ActionsType {
  AddTodos = 'addTodos',
  AddUser = 'addUser',
  ClearUser = 'clearUser',
  HandleCheck = 'handleCheck',
}

export type AddTodosAction = Action<ActionsType.AddTodos, Todo[]>;

export type AddUserAction = Action<ActionsType.AddUser, User | null>;

type ClearUserAction = BaseAction<ActionsType.ClearUser>;
type HandleCheck = Action<ActionsType.HandleCheck, number>;

export type Actions = (
  AddTodosAction
  | AddUserAction
  | ClearUserAction
  | HandleCheck
);
