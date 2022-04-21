import { Action as BaseAction } from 'redux';
import { Todo } from '../types/todo';
import { User } from '../types/user';

export interface RootState {
  todos: Todo[],
  selectedUserId: number;
  user: User | null;
}

export interface Action<T, P> extends BaseAction<T> {
  payload: P,
}

export enum ActionsType {
  LoadTodos = 'loadTodos',
  DeleteTodo = 'deleteTodo',
  SelectUserId = 'selectUserId',
  LoadUser = 'loadUser',
}

export type LoadTodosAction = Action<ActionsType.LoadTodos, Todo[]>;
export type RemoveTodoAction = Action<ActionsType.DeleteTodo, number>;
export type SelectUserIdAction = Action<ActionsType.SelectUserId, number>;
export type LoadUserAction = Action<ActionsType.LoadUser, User>;

export type Actions = LoadTodosAction | RemoveTodoAction
| SelectUserIdAction | LoadUserAction;
