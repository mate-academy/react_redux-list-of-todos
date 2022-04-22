import { Action as BaseAction } from 'redux';
import { Todo } from '../types/todo.type';
import { User } from '../types/user.type';

export interface RootState {
  todos: Todo[];
  selectedUserId: number;
  allUsers: User[];
  loading: boolean;
  message: string;
}

export interface Action<T, P> extends BaseAction<T> {
  payload: P,
}

export enum ActionTypes {
  AddTodos = 'addTodos',
  RemoveTodo = 'removeTodo',
  SelectedUserId = 'selectedTodoId',
  AddAllUsers = 'addAllUsers',
}

export type AddTodosAction = Action<ActionTypes.AddTodos, Todo[]>;
export type AddAllUsersAction = Action<ActionTypes.AddAllUsers, User[]>;
export type SelectedUserIdAction = Action<ActionTypes.SelectedUserId, number>;
export type RemoveTodosAction = Action<ActionTypes.RemoveTodo, number>;

export type Actions =
  AddTodosAction
  | AddAllUsersAction
  | SelectedUserIdAction
  | RemoveTodosAction;
