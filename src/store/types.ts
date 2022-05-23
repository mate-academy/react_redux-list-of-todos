import { Action as BaseAction } from 'redux';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

export interface TodosState {
  todos: Todo[],
  selectedId: number,
  selectedUser: User | null,
}

export interface Action<T, P> extends BaseAction<T> {
  payload: P,
}

export enum ActionsType {
  LoadTodos = 'loadTodos',
  SelectId = 'selectTodo',
  CurrentUser = 'currentUser',
}

export type LoadTodos = Action<ActionsType.LoadTodos, Todo[]>;
export type SelectId = Action<ActionsType.SelectId, number>;
export type CurrentUser = Action<ActionsType.CurrentUser, User>;

export type Actions = LoadTodos | SelectId | CurrentUser;
