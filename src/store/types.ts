import { Action as BaseAction } from 'redux';
import { Todo } from '../types/todo.type';
import { User } from '../types/user.type';

export interface RootState {
  todos: Todo[];
  selectedUserId: number;
  user: User | null;
}

export interface Action<T, P> extends BaseAction<T> {
  payload: P,
}

export enum ActionTypes {
  AddTodos = 'addTodos',
  RemoveTodo = 'removeTodo',
  SelectedUserId = 'selectedTodoId',
  AddUser = 'addUser',
}

export type AddTodosAction = Action<ActionTypes.AddTodos, Todo[]>;
export type AddUserAction = Action<ActionTypes.AddUser, User | null>;
export type SelectedUserIdAction = Action<ActionTypes.SelectedUserId, number>;
export type RemoveTodosAction = Action<ActionTypes.RemoveTodo, number>;

export type Actions =
  AddTodosAction
  | AddUserAction
  | SelectedUserIdAction
  | RemoveTodosAction;
