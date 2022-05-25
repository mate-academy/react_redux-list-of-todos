import { Action as BaseAction } from 'redux';
import { Todo, User } from '../react-app-env';

export interface State {
  todos: Todo[],
  selectUserId: number,
  user: User | null,
}

export interface Action<T, P> extends BaseAction<T> {
  payload: P,
}

export enum ActionType {
  AddTodos = 'AddTodos',
  SelectUserId = 'SelectUserId',
  LoadUserById = 'LoadUserById',
}

export type AddTodosAction = Action<ActionType.AddTodos, Todo[]>;
export type SelectUserIdAction = Action<ActionType.SelectUserId, number>;
export type LoadUserByIdAction = Action<ActionType.LoadUserById, User>;

export type Actions = AddTodosAction | SelectUserIdAction | LoadUserByIdAction;
