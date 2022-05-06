import { Action as BaseAction } from 'redux';
import { Todo, User } from '../types';

export interface State {
  todos: Todo[],
  selectUserById: number;
  user: User | null;
}

export interface Action<T, P> extends BaseAction<T> {
  payload: P,
}

export enum ActionType {
  AddTodos = 'AddTodos',
  SelectUserById = 'SelectUserById',
  LoadUserById = 'LoadUserById',
}

export type AddTodosAction = Action<ActionType.AddTodos, Todo[]>;
export type SelectUserIdAction = Action<ActionType.SelectUserById, number>;
export type LoadUserByIdAction = Action<ActionType.LoadUserById, User>;

export type Actions = AddTodosAction | SelectUserIdAction | LoadUserByIdAction;
